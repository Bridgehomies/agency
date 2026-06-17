import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
    title: "AI Development Company in Pakistan | Bridge Homies",
    description: "Partner with Pakistan's AI/ML engineers to build RAG pipelines, custom LLMs, and automated workflow solutions.",
    alternates: { canonical: "https://www.bridgehomies.com/ai-ml-agency-pakistan" },
    openGraph: {
        title: "AI Development Company in Pakistan | Bridge Homies",
        description: "Partner with Pakistan's AI/ML engineers to build RAG pipelines, custom LLMs, and automated workflow solutions.",
        url: "https://www.bridgehomies.com/ai-ml-agency-pakistan",
        type: "website",
    },
};

export default function AiMlAgencyPakistan() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness"],
        "name": "Bridge Homies",
        "description": "AI/ML engineering agency delivering RAG pipelines, LLM integration, MLOps, and custom software from Lahore, Pakistan.",
        "url": "https://www.bridgehomies.com",
        "foundingDate": "2025",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "167/A Block G1, Johar Town",
            "addressLocality": "Lahore",
            "addressRegion": "Punjab",
            "postalCode": "54782",
            "addressCountry": "PK"
        },
        "telephone": "+92-342-9263395",
        "email": "info@bridgehomies.com",
        "sameAs": [
            "https://www.linkedin.com/company/bridge-homies",
            "https://github.com/Bridgehomies"
        ],
        "areaServed": { "@type": "Country", "name": "Pakistan" }
    };

    const capabilities = [
        {
            title: "RAG Pipelines & LLM Integration",
            body: "We connect large language models to your data  documents, databases, APIs  so they retrieve real facts instead of hallucinating. Deployed with sub-200ms latency in production.",
        },
        {
            title: "Custom ML Model Engineering",
            body: "From dataset preparation to model training, evaluation, and MLOps, we own the full cycle. PyTorch, scikit-learn, Hugging Face  whatever fits the problem.",
        },
        {
            title: "Full-Stack AI Applications",
            body: "Next.js frontends wired to Python ML backends. We ship the entire product  not just the model  so your team can use it from day one.",
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
                <Navbar />

                {/* Hero */}
                <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
                    <div className="bg-grid-pattern absolute inset-0 opacity-50" />
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-center">
                            <div className="lg:col-span-8 flex flex-col items-start space-y-6">
                                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                                    Enterprise-Grade AI Architecture
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl max-w-3xl leading-[1.1]">
                                    The Premier{" "}
                                    <span className="text-primary">
                                        AI Development Company
                                    </span>{" "}
                                    in Pakistan.
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                                    We engineer RAG pipelines, custom ML models, and LLM integrations that generate measurable business value  built by a Lahore-based team with production deployments across logistics, fintech, and SaaS.
                                </p>
                                <div className="pt-4">
                                    <a
                                        href="#contact"
                                        className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-200"
                                    >
                                        Book a Discovery Call
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Capabilities */}
                <section className="border-t border-border bg-muted/30 py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <p className="text-base font-semibold leading-7 text-primary">What we build</p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                                Engineered for Production
                            </h2>
                        </div>
                        <dl className="mx-auto mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:mt-24 lg:max-w-none lg:grid-cols-3">
                            {capabilities.map(({ title, body }) => (
                                <div
                                    key={title}
                                    className="flex flex-col rounded-2xl border border-border bg-card p-8 hover:border-primary/40 transition-all duration-200"
                                >
                                    <dt className="text-xl font-semibold leading-7 text-card-foreground">{title}</dt>
                                    <dd className="mt-4 flex-auto text-base leading-7 text-muted-foreground">{body}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* Case Study */}
                <section className="border-t border-border py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">AI in Production: Case Study</h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                Automated e-invoicing and compliance engine for a logistics operator.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-5xl rounded-2xl border border-border bg-card p-8 lg:p-12">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-border pb-6 gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold">Automated E-Invoicing & Compliance Engine</h3>
                                    <p className="text-muted-foreground mt-1 text-sm">Logistics Sector  Pakistan</p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">99.4% Accuracy</span>
                                    <span className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border">&lt;200ms Latency</span>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-4">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">What We Built</h4>
                                    <p className="text-foreground leading-relaxed">
                                        A parallelized document processing pipeline linking custom layout models with deep learning-driven error routing. The system extracts ledger fields from unstructured international billing data and validates tax structures against government API nodes  all in under 200ms.
                                    </p>
                                </div>
                                <div className="rounded-xl bg-muted p-6 flex flex-col justify-between border border-border">
                                    <div className="space-y-4">
                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Result</span>
                                        <div className="text-4xl font-extrabold">82%</div>
                                        <p className="text-xs text-muted-foreground leading-normal">
                                            Reduction in manual compliance exceptions within 90 days of deployment.
                                        </p>
                                    </div>
                                    <div className="pt-6 border-t border-border mt-6">
                                        <a href="#contact" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                                            Discuss your project <span>&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section id="contact" className="relative border-t border-border bg-muted/30 py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                    <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8 space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Ready to build your AI system?
                        </h2>
                        <p className="mx-auto max-w-xl text-lg leading-8 text-muted-foreground">
                            Talk to our ML engineers about your pipeline. We'll scope it, price it, and tell you honestly if you need it.
                        </p>
                        <div className="flex items-center justify-center pt-4">
                            <a
                                href="mailto:info@bridgehomies.com"
                                className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200"
                            >
                                Get in touch
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}