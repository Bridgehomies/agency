import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Bridge Homies website, enquiries, analytics, and submitted content.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="container px-4 py-20 sm:px-6 md:py-32 lg:px-8">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Legal information
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-6xl">
            Privacy Policy
          </h1>

          <p className="text-lg text-muted-foreground md:text-xl">
            How Bridge Homies handles information shared through this website
            and our enquiries.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            Effective August 2026
          </p>
        </header>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">
              Information we receive
            </h2>

            <p className="leading-7 text-muted-foreground">
              Bridge Homies may receive information you choose to send through
              contact forms, email, testimonial submissions, blog submissions,
              or project enquiries. This can include your name, email address,
              phone number, company details, project requirements, and any
              files or messages you provide.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">
              How we use information
            </h2>

            <p className="leading-7 text-muted-foreground">
              We use submitted information to respond to enquiries, assess
              project fit, provide proposals, deliver requested services,
              publish approved content, maintain site security, and improve our
              website. We do not sell personal information. Service providers
              may process information for hosting, analytics, forms, email
              delivery, and infrastructure.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">
              Retention and your choices
            </h2>

            <p className="leading-7 text-muted-foreground">
              We retain information only as long as reasonably needed for the
              purpose it was supplied, a client relationship, legal
              obligations, or dispute resolution. You may ask what information
              we hold about you, request correction or deletion where
              applicable, or withdraw a marketing preference by emailing
              info@bridgehomies.com.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Contact us</h2>

            <p className="leading-7 text-muted-foreground">
              Questions about this policy can be sent to{" "}
              <a
                className="text-primary hover:underline"
                href="mailto:info@bridgehomies.com"
              >
                info@bridgehomies.com
              </a>
              . Bridge Homies is based at 164, Block G-1, Phase-1, Johar
              Town, Lahore, Punjab, Pakistan. We may update this page when our
              practices change and will publish the latest effective date here.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}