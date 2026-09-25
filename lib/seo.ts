const BRAND_SUFFIX = /\s*[|—-]\s*Bridge Homies\s*$/i;

function trimAtWordBoundary(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  // Reserve one character for the ellipsis so the emitted tag never exceeds
  // the requested limit.
  const truncated = normalized.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${(lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated.slice(0, maxLength)).trim()}…`;
}

/** Keep titles concise and prevent duplicate branding from nested templates. */
export function blogSeoTitle(value: string) {
  return trimAtWordBoundary(value.replace(BRAND_SUFFIX, ""), 60);
}

/** Keep meta descriptions within the useful search-snippet range. */
export function blogSeoDescription(value: string) {
  return trimAtWordBoundary(value, 155);
}
