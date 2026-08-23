import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SITE_URL } from "@/lib/config";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Bridge Homies",
  description:
    "Contact Bridge Homies in Lahore for AI/ML engineering, custom software, web, mobile, and SaaS projects.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="container px-4 py-20 sm:px-6 md:py-32 lg:px-8">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Start a conversation
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-6xl">
            Get In Touch
          </h1>

          <p className="text-lg text-muted-foreground md:text-xl">
            Have a project in mind? We&apos;d love to hear what you&apos;re
            building and help you find the right next step.
          </p>
        </header>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          <section className="space-y-8">
            <div>
              <h2 className="mb-3 text-2xl font-bold">
                Contact Information
              </h2>

              <p className="leading-7 text-muted-foreground">
                Tell us what you are trying to build, what is currently slowing
                your team down, and what a successful launch looks like. Bridge
                Homies helps founders and established businesses plan, design,
                build, and improve AI/ML systems, custom software, websites,
                mobile apps, SaaS platforms, and internal business tools.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Mail className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-medium">Email</h3>

                <a
                  className="text-muted-foreground transition-colors hover:text-primary"
                  href="mailto:info@bridgehomies.com"
                >
                  info@bridgehomies.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Phone className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-medium">Phone</h3>

                <a
                  className="text-muted-foreground transition-colors hover:text-primary"
                  href="tel:+923429263395"
                >
                  +92 342 9263395
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <MapPin className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-lg font-medium">Office</h3>

                <address className="not-italic leading-7 text-muted-foreground">
                  164, Block G-1, Phase-1
                  <br />
                  Johar Town, Lahore, Punjab, Pakistan
                </address>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10">
            <h2 className="mb-4 text-2xl font-bold">What to include</h2>

            <p className="mb-6 leading-7 text-muted-foreground">
              For project enquiries, include your preferred timeline, main
              requirements, reference products, and any budget range you have
              already approved. This helps us recommend the right scope and
              next step.
            </p>

            <ul className="space-y-4 text-muted-foreground">
              <li className="border-b border-border pb-4">
                The product, service, or workflow you want to improve
              </li>

              <li className="border-b border-border pb-4">
                Your target users and preferred launch timeline
              </li>

              <li className="border-b border-border pb-4">
                Any existing software, designs, or integrations
              </li>

              <li>How you prefer us to contact you</li>
            </ul>
          </section>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              url: `${SITE_URL}/contact`,
              name: "Contact Bridge Homies",
              about: {
                "@id": `${SITE_URL}/#organization`,
              },
            }),
          }}
        />
      </main>

      <Footer />
    </>
  );
}