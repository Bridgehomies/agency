#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "google-api-python-client>=2.150.0",
#   "google-auth-oauthlib>=1.2.1",
# ]
# ///
"""Fetch Google Search Console query metrics for Bridge Homies service pages.

Run from the repository root with:

    uv run scripts/fetch_search_console_services.py

The OAuth client file is read locally and must never be committed. The script
requests read-only Search Console access, stores OAuth tokens in the user's
private cache directory, and writes the query export under ignored seo-output/.

To inspect Google index status for all service pages:

    uv run scripts/fetch_search_console_services.py --inspect-indexing
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from datetime import date, timedelta
from pathlib import Path
import time
from typing import Any

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
SERVICE_PAGES = [
    ("AI development company", "/ai-ml-agency-pakistan"),
    ("AI/ML development", "/ai-ml-development"),
    ("Custom software development", "/software"),
    ("Web application development", "/webdev"),
    ("Mobile app development", "/mobile"),
    ("SaaS product development", "/saas-product-development"),
    ("Business process automation", "/business-automation"),
    ("API integration", "/api-system-integration"),
    ("Cloud and DevOps", "/cloud-devops"),
    ("UI/UX design", "/ui-ux-design"),
    ("Software consulting", "/technical-consulting"),
    ("Software support and maintenance", "/software-support-maintenance"),
    ("Software product discovery and MVP planning", "/design"),
    ("MLOps consulting", "/mlops-consulting-services"),
]
SITE_HOST = "www.bridgehomies.com"


def parse_args() -> argparse.Namespace:
    today = date.today()
    default_end = today - timedelta(
        days=3
    )  # Search Console's newest days can be incomplete.
    default_start = default_end - timedelta(days=364)
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--client-secrets",
        type=Path,
        default=Path(
            "client_secret_458359182933-7seld266a4c8oihulu4959lpefi4ef0g.apps.googleusercontent.com.json"
        ),
        help="Installed-app OAuth client JSON (default: the supplied file in the repository root).",
    )
    parser.add_argument(
        "--token-file",
        type=Path,
        default=Path.home() / ".cache" / "bridgehomies" / "search-console-token.json",
        help="Private OAuth token cache path.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("seo-output") / "search-console-service-queries.csv",
        help="CSV path (default is inside git-ignored seo-output/).",
    )
    parser.add_argument("--start-date", default=default_start.isoformat())
    parser.add_argument("--end-date", default=default_end.isoformat())
    parser.add_argument(
        "--property",
        dest="site_property",
        help="Override the discovered Search Console property.",
    )
    parser.add_argument(
        "--country-code",
        help="Optional ISO 3166-1 alpha-3 country filter (for example, pak for Pakistan).",
    )
    parser.add_argument(
        "--inspect-indexing",
        action="store_true",
        help="Inspect Google index status for all service URLs instead of fetching query metrics.",
    )
    parser.add_argument(
        "--inspection-output",
        type=Path,
        default=Path("seo-output") / "search-console-service-indexing.csv",
        help="CSV output for --inspect-indexing.",
    )
    parser.add_argument(
        "--row-limit", type=int, default=25_000, choices=range(1, 25_001)
    )
    return parser.parse_args()


def authorize(client_secrets: Path, token_file: Path) -> Credentials:
    if not client_secrets.is_file():
        raise FileNotFoundError(f"OAuth client file not found: {client_secrets}")

    credentials: Credentials | None = None
    if token_file.is_file():
        credentials = Credentials.from_authorized_user_file(str(token_file), SCOPES)

    if credentials and credentials.expired and credentials.refresh_token:
        credentials.refresh(Request())

    if not credentials or not credentials.valid:
        flow = InstalledAppFlow.from_client_secrets_file(str(client_secrets), SCOPES)
        credentials = flow.run_local_server(
            port=0, access_type="offline", prompt="consent"
        )
        token_file.parent.mkdir(parents=True, exist_ok=True)
        token_file.write_text(credentials.to_json(), encoding="utf-8")
        token_file.chmod(0o600)

    return credentials


def discover_property(service: Any) -> str:
    properties = service.sites().list().execute().get("siteEntry", [])
    candidates = [
        item["siteUrl"]
        for item in properties
        if "bridgehomies.com" in item.get("siteUrl", "").lower()
        and item.get("permissionLevel")
        in {"siteOwner", "siteFullUser", "siteRestrictedUser"}
    ]
    if not candidates:
        raise RuntimeError(
            "The authorized Google account has no accessible Search Console property for bridgehomies.com."
        )
    # Prefer the URL-prefix property that matches the canonical pages; otherwise use the domain property.
    return next(
        (item for item in candidates if item == f"https://{SITE_HOST}/"),
        next(
            (item for item in candidates if item.startswith("sc-domain:")),
            candidates[0],
        ),
    )


def fetch_page_queries(
    service: Any,
    property_url: str,
    page_url: str,
    start_date: str,
    end_date: str,
    row_limit: int,
    country_code: str | None = None,
) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    start_row = 0
    while True:
        response = (
            service.searchanalytics()
            .query(
                siteUrl=property_url,
                body={
                    "startDate": start_date,
                    "endDate": end_date,
                    "dimensions": ["query"],
                    "dimensionFilterGroups": [
                        {
                            "filters": [
                                {
                                    "dimension": "page",
                                    "operator": "equals",
                                    "expression": page_url,
                                },
                                *(
                                    [
                                        {
                                            "dimension": "country",
                                            "operator": "equals",
                                            "expression": country_code.lower(),
                                        }
                                    ]
                                    if country_code
                                    else []
                                ),
                            ],
                        }
                    ],
                    "rowLimit": row_limit,
                    "startRow": start_row,
                    "type": "web",
                },
            )
            .execute()
        )
        batch = response.get("rows", [])
        rows.extend(batch)
        if len(batch) < row_limit:
            break
        start_row += len(batch)
    return rows


def inspect_service_pages(service: Any, property_url: str, output: Path) -> int:
    columns = [
        "service",
        "page",
        "verdict",
        "coverage_state",
        "indexing_state",
        "page_fetch_state",
        "robots_txt_state",
        "google_canonical",
        "user_canonical",
        "last_crawl_time",
        "sitemaps",
        "referring_urls",
        "error",
    ]
    output.parent.mkdir(parents=True, exist_ok=True)
    indexed_count = 0
    inspected_count = 0
    with output.open("w", newline="", encoding="utf-8-sig") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=columns)
        writer.writeheader()
        for service_name, route in SERVICE_PAGES:
            page_url = f"https://{SITE_HOST}{route}"
            try:
                response = (
                    service.urlInspection()
                    .index()
                    .inspect(
                        body={
                            "inspectionUrl": page_url,
                            "siteUrl": property_url,
                            "languageCode": "en-US",
                        }
                    )
                    .execute()
                )
                result = response.get("inspectionResult", {}).get(
                    "indexStatusResult", {}
                )
                verdict = result.get("verdict", "")
                indexed_count += int(verdict == "PASS")
                inspected_count += 1
                writer.writerow(
                    {
                        "service": service_name,
                        "page": page_url,
                        "verdict": verdict,
                        "coverage_state": result.get("coverageState", ""),
                        "indexing_state": result.get("indexingState", ""),
                        "page_fetch_state": result.get("pageFetchState", ""),
                        "robots_txt_state": result.get("robotsTxtState", ""),
                        "google_canonical": result.get("googleCanonical", ""),
                        "user_canonical": result.get("userCanonical", ""),
                        "last_crawl_time": result.get("lastCrawlTime", ""),
                        "sitemaps": " | ".join(result.get("sitemap", [])),
                        "referring_urls": " | ".join(result.get("referringUrls", [])),
                        "error": "",
                    }
                )
            except HttpError as exc:
                inspected_count += 1
                writer.writerow(
                    {
                        "service": service_name,
                        "page": page_url,
                        "error": f"HTTP {exc.resp.status}: {exc.reason}",
                    }
                )
            except (
                Exception
            ) as exc:  # Preserve the failure against this URL and continue the batch.
                writer.writerow(
                    {
                        "service": service_name,
                        "page": page_url,
                        "error": f"{type(exc).__name__}: {exc}",
                    }
                )
            csv_file.flush()
            time.sleep(1)
    print(f"Search Console property: {property_url}")
    print(f"Inspection CSV: {output.resolve()}")
    print(
        f"Pages processed: {len(SERVICE_PAGES)}; responses received: {inspected_count}; verdict PASS: {indexed_count}"
    )
    print(
        "Note: URL Inspection reports Google's indexed version, not live URL behavior or keyword difficulty."
    )
    return 0


def main() -> int:
    args = parse_args()
    if date.fromisoformat(args.start_date) > date.fromisoformat(args.end_date):
        raise ValueError("--start-date must be on or before --end-date")

    credentials = authorize(args.client_secrets, args.token_file)
    service = build(
        "searchconsole", "v1", credentials=credentials, cache_discovery=False
    )
    property_url = args.site_property or discover_property(service)

    if args.inspect_indexing:
        return inspect_service_pages(service, property_url, args.inspection_output)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    columns = [
        "service",
        "page",
        "query",
        "clicks",
        "impressions",
        "ctr",
        "average_position",
        "position_band",
    ]
    page_summaries: list[tuple[str, int, int, float, int]] = []

    with args.output.open("w", newline="", encoding="utf-8-sig") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=columns)
        writer.writeheader()

        for service_name, route in SERVICE_PAGES:
            page_url = f"https://{SITE_HOST}{route}"
            rows = fetch_page_queries(
                service,
                property_url,
                page_url,
                args.start_date,
                args.end_date,
                args.row_limit,
                args.country_code,
            )
            total_clicks = sum(int(row.get("clicks", 0)) for row in rows)
            total_impressions = sum(int(row.get("impressions", 0)) for row in rows)
            weighted_position = (
                sum(
                    float(row.get("position", 0)) * int(row.get("impressions", 0))
                    for row in rows
                )
                / total_impressions
                if total_impressions
                else 0.0
            )
            position_band_rows = 0

            for row in rows:
                impressions = int(row.get("impressions", 0))
                position = float(row.get("position", 0))
                keys = row.get("keys", [""])
                query = keys[0] if keys else ""
                normalized_query = query.strip().lower()
                # Filter known navigational/site queries. Relevance still needs human review.
                nonbrand_query = not (
                    normalized_query.startswith("site:")
                    or "bridge homies" in normalized_query
                    or "apphomie" in normalized_query
                )
                # Position bands describe observed ranking only; they are not opportunity or difficulty scores.
                if nonbrand_query and impressions >= 2 and 5 < position <= 20:
                    band = "page_1_proximity"
                elif nonbrand_query and impressions >= 2 and 20 < position <= 30:
                    band = "page_2_visibility"
                else:
                    band = ""
                position_band_rows += int(bool(band))
                writer.writerow(
                    {
                        "service": service_name,
                        "page": page_url,
                        "query": query,
                        "clicks": row.get("clicks", 0),
                        "impressions": impressions,
                        "ctr": round(float(row.get("ctr", 0)), 5),
                        "average_position": round(position, 1),
                        "position_band": band,
                    }
                )

            page_summaries.append(
                (
                    service_name,
                    total_clicks,
                    total_impressions,
                    weighted_position,
                    position_band_rows,
                )
            )

    print(f"Search Console property: {property_url}")
    print(f"Date range: {args.start_date} through {args.end_date}")
    print(
        f"Country filter: {args.country_code.upper() if args.country_code else 'all countries'}"
    )
    print(f"CSV: {args.output.resolve()}")
    print(
        "\nService page summary (weighted average position; non-brand rows with positions 6–30):"
    )
    print(
        f"{'Service':42} {'Clicks':>8} {'Impressions':>12} {'Avg pos.':>10} {'Rows 6–30':>14}"
    )
    for name, clicks, impressions, position, band_rows in page_summaries:
        position_text = f"{position:.1f}" if impressions else "—"
        print(
            f"{name:42.42} {clicks:8d} {impressions:12d} {position_text:>10} {band_rows:14d}"
        )
    print(
        "\nNote: position_band only describes observed positions; review each query for brand, relevance, and intent. These bands are not keyword difficulty or easy-rank guarantees."
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except HttpError as exc:
        print(
            f"Search Console API error: {exc.resp.status} {exc.reason}", file=sys.stderr
        )
        raise SystemExit(1)
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        raise SystemExit(1)
