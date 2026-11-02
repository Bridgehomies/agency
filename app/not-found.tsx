import dynamic from "next/dynamic";
import Link from "next/link";

// Keep the not-found status and recovery links in server-rendered HTML so
// crawlers can identify a missing route without waiting for client hydration.
const NotFoundExperience = dynamic(() => import("@/components/NotFoundExperience"));

export default function NotFound() {
  return (
    <>
      <section className="sr-only" aria-label="404 recovery information">
        <h1>404 — Page not found</h1>
        <p>The requested Bridge Homies page does not exist.</p>
        <p>
          Try the <Link href="/">home page</Link>, <Link href="/sitemap.xml">site map</Link>,{" "}
          <Link href="/aboutus">about page</Link>, or <Link href="/contact">contact page</Link>.
        </p>
      </section>
      <NotFoundExperience />
    </>
  );
}
