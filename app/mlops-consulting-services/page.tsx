import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const pageUrl = "https://www.bridgehomies.com/mlops-consulting-services";

export const metadata: Metadata = {
  title: { absolute: "MLOps Consulting Services & Implementation | Bridge Homies" },
  description:
    "MLOps consulting services for production ML: CI/CD, deployment, monitoring, model registries, retraining, governance, and cloud implementation.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "MLOps Consulting Services & Implementation | Bridge Homies",
    description:
      "Design and implement reliable ML operations across deployment, monitoring, retraining, governance, and production infrastructure.",
    url: pageUrl,
    siteName: "Bridge Homies",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bridge Homies MLOps consulting services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MLOps Consulting Services & Implementation | Bridge Homies",
    description:
      "Production MLOps consulting and implementation for deployment pipelines, monitoring, retraining, governance, and cloud infrastructure.",
    images: ["/og-image.png"],
  },
};

const services = [
  {
    num: "01",
    title: "MLOps Strategy & Maturity Assessment",
    description:
      "Map the current ML lifecycle, identify operational and ownership gaps, and define a staged target architecture based on business risk rather than a predetermined tool stack.",
  },
  {
    num: "02",
    title: "ML Pipeline Automation",
    description:
      "Build repeatable flows for data validation, training, evaluation, packaging, registration, approval, and deployment so production releases do not depend on manual handoffs.",
  },
  {
    num: "03",
    title: "CI/CD for Machine Learning",
    description:
      "Add automated tests, model-quality gates, environment controls, approvals, canary or blue-green deployment patterns, and rollback conditions to the ML release process.",
  },
  {
    num: "04",
    title: "Model Registry & Experiment Tracking",
    description:
      "Connect code, data, configuration, experiments, and approved model versions so teams can reproduce a release and know exactly what is running in production.",
  },
  {
    num: "05",
    title: "Machine Learning Model Deployment",
    description:
      "Deploy batch, API, real-time, or containerised inference workloads with infrastructure sized for latency, throughput, privacy, reliability, and cost requirements.",
  },
  {
    num: "06",
    title: "Model Monitoring & Drift Detection",
    description:
      "Observe service health alongside latency, spend, input changes, drift, model-quality signals, and the business metrics that indicate whether predictions remain useful.",
  },
  {
    num: "07",
    title: "Automated Retraining & Release Controls",
    description:
      "Define when retraining should happen, how a candidate model is compared with the current version, who approves promotion, and how a known-good model is restored.",
  },
  {
    num: "08",
    title: "ML Governance & Production Runbooks",
    description:
      "Make access, audit trails, ownership, incident response, model retirement, retention, and handover explicit so the system remains governable after launch.",
  },
];

const process = [
  ["Assess", "Review the current workflow, model lifecycle, deployment path, monitoring, ownership, security constraints, and operational failure modes."],
  ["Architect", "Define the smallest production architecture that closes the highest-risk gaps without forcing an oversized MLOps platform."],
  ["Implement", "Build the required pipelines, registry, serving layer, infrastructure, observability, and release controls in the stack that fits your environment."],
  ["Validate", "Test reproducibility, deployment gates, rollback, alerts, permissions, model-quality signals, and operational recovery before production handover."],
  ["Operate", "Document runbooks, ownership, retraining decisions, cost controls, and the ongoing maintenance model your internal team or ours will follow."],
];

const stack = [
  ["Cloud", "AWS · Azure · Google Cloud"],
  ["Lifecycle", "MLflow · Kubeflow · cloud-native registries"],
  ["Orchestration", "Airflow · Prefect · managed workflow services"],
  ["Containers", "Docker · Kubernetes · KServe"],
  ["Infrastructure", "Terraform · CI/CD environments · secrets management"],
  ["Monitoring", "Prometheus · Grafana · Evidently · cloud observability"],
  ["Delivery", "GitHub Actions · GitLab CI · controlled release pipelines"],
  ["ML & Serving", "Python · PyTorch · TensorFlow · FastAPI"],
];

const faqs = [
  {
    question: "What do MLOps consulting services include?",
    answer:
      "MLOps consulting services typically include an assessment of the current ML lifecycle, target architecture, reproducible training and deployment pipelines, model and data versioning, model registry setup, CI/CD, monitoring, retraining controls, governance, runbooks, and handover. The exact scope should match the risk and change rate of the ML system.",
  },
  {
    question: "What is the difference between MLOps consulting and MLOps implementation services?",
    answer:
      "Consulting focuses on diagnosing gaps, defining the operating model, architecture, controls, and roadmap. MLOps implementation services turn that plan into working pipelines, infrastructure, monitoring, deployment controls, and production runbooks. A practical engagement can combine both when the team needs advice and hands-on delivery.",
  },
  {
    question: "When should we hire an MLOps consultant?",
    answer:
      "An MLOps consultant is useful when model releases are manual, production behaviour is hard to observe, nobody can reproduce a model version, retraining is unreliable, rollback is unclear, governance requirements are increasing, or the ML system is becoming important enough that silent failure would be expensive.",
  },
  {
    question: "Can Bridge Homies work with our existing cloud and ML stack?",
    answer:
      "Yes. The goal is not to replace working infrastructure unnecessarily. We assess the existing environment and can implement around established cloud, CI/CD, data, model, and application systems when that is the lower-risk path.",
  },
  {
    question: "Do all ML teams need Kubernetes, Kubeflow, or a large MLOps platform?",
    answer:
      "No. A smaller system may only need versioned code and models, repeatable deployment, monitoring, a rollback path, and clear ownership. Tooling should be proportional to the number of models, release frequency, team size, compliance needs, traffic, and cost of failure.",
  },
  {
    question: "Do your MLOps services cover generative AI and RAG systems?",
    answer:
      "Yes, where the operating problem requires it. For RAG and LLM systems, production operations can also include prompt and configuration versioning, retrieval evaluation, access-filter testing, provider and latency monitoring, cost controls, fallback behaviour, and safety or approval gates.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}/#webpage`,
      url: pageUrl,
      name: "MLOps Consulting Services & Implementation | Bridge Homies",
      description:
        "MLOps consulting and implementation services for ML deployment, CI/CD, monitoring, retraining, governance, and production infrastructure.",
      isPartOf: { "@id": "https://www.bridgehomies.com/#website" },
      about: { "@id": `${pageUrl}/#service` },
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}/#service`,
      name: "MLOps Consulting Services",
      serviceType: [
        "MLOps Consulting",
        "MLOps Implementation Services",
        "Machine Learning Model Deployment",
        "ML Model Monitoring",
        "CI/CD for Machine Learning",
      ],
      provider: { "@id": "https://www.bridgehomies.com/#organization" },
      url: pageUrl,
      areaServed: "Worldwide",
      description:
        "MLOps consulting services and implementation for production machine-learning systems, including pipelines, deployment, monitoring, model registries, retraining, governance, and cloud infrastructure.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.bridgehomies.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "AI & ML Development",
          item: "https://www.bridgehomies.com/ai-ml-development",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "MLOps Consulting Services",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function MLOpsConsultingServicesPage() {
  return (
    <main className="font-sans bg-gray-50 text-gray-900 selection:bg-purple-900 selection:text-white overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <section className="relative pt-36 pb-24 lg:pt-52 lg:pb-36 min-h-[88vh] flex items-center border-b border-gray-200">
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute right-[-12rem] top-24 h-[34rem] w-[34rem] rounded-full bg-purple-300/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700">
                  Production ML Operations
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.6rem] font-black tracking-tighter leading-[0.9] text-gray-900">
                MLOps Consulting
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-500 to-gray-500">
                  Services.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 pb-2">
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Bridge Homies provides <strong className="text-gray-900">MLOps consulting and implementation services</strong> for teams that need machine-learning systems to deploy, monitor, retrain, and recover reliably in production.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3.5 font-bold hover:bg-purple-700 transition-colors"
                >
                  Discuss Your MLOps Architecture <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href="/blog/what-is-mlops-consulting"
                  className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-900 px-6 py-3.5 font-bold hover:border-purple-600 hover:text-purple-700 transition-colors"
                >
                  Read the MLOps Guide
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-7 border-t border-gray-300 grid sm:grid-cols-3 gap-5 text-sm text-gray-600">
            <p><strong className="text-gray-900">Release safely:</strong> reproducible pipelines, tests, approvals, and rollback.</p>
            <p><strong className="text-gray-900">See problems early:</strong> infrastructure, cost, drift, and model-quality monitoring.</p>
            <p><strong className="text-gray-900">Keep ownership clear:</strong> governance, runbooks, retraining decisions, and handover.</p>
          </div>
        </div>
      </section>

      <section id="services" className="py-28 md:py-36 bg-white" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center space-x-3 mb-7">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700">What We Implement</span>
              </div>
              <h2 id="services-heading" className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]">
                MLOps consulting services built around the production lifecycle.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-gray-600 leading-relaxed">
                The scope starts with the operational failure you need to prevent. We then design the smallest set of pipelines, controls, infrastructure, and ownership practices required to run the model responsibly.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
            {services.map((service) => (
              <article key={service.num} className="bg-white p-7 md:p-8 min-h-72 hover:bg-gray-50 transition-colors">
                <span className="text-xs font-bold tracking-[0.18em] text-purple-700">{service.num}</span>
                <h3 className="text-xl font-bold mt-8 mb-4 leading-tight">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-gray-900 text-white relative overflow-hidden" aria-labelledby="implementation-heading">
        <div className="absolute -left-32 -bottom-32 w-[30rem] h-[30rem] rounded-full bg-purple-700/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center space-x-3 mb-7">
                <div className="h-px w-8 bg-purple-400" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-300">Hands-on Delivery</span>
              </div>
              <h2 id="implementation-heading" className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-7">
                MLOps Implementation Services
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A roadmap is useful only if somebody can turn it into an operating system. Our MLOps implementation work covers the engineering layer around the model: pipelines, infrastructure, serving, observability, controls, and handover.
              </p>
              <p className="text-gray-400 leading-relaxed mt-6">
                We can work from an existing architecture, improve an incomplete setup, or combine consulting and implementation in one staged engagement.
              </p>
            </div>

            <div className="lg:col-span-7 border border-gray-700">
              {process.map(([title, description], index) => (
                <div key={title} className="grid grid-cols-[64px_1fr] md:grid-cols-[86px_180px_1fr] border-b border-gray-700 last:border-b-0 bg-gray-900 hover:bg-gray-800 transition-colors">
                  <div className="p-5 md:p-6 text-purple-300 text-xs font-bold tracking-[0.16em] border-r border-gray-700">0{index + 1}</div>
                  <h3 className="hidden md:block p-6 font-bold border-r border-gray-700">{title}</h3>
                  <div className="p-5 md:p-6">
                    <h3 className="md:hidden font-bold mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-gray-50 border-y border-gray-200" aria-labelledby="consultant-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center space-x-3 mb-7">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700">When Expertise Helps</span>
              </div>
              <h2 id="consultant-heading" className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-7">
                When should you hire an MLOps consultant?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                The strongest signal is not team size. It is operational risk: the model matters to the business, but the path from training to production is difficult to reproduce, observe, or recover.
              </p>
              <Link href="/blog/what-is-mlops-consulting" className="mt-8 inline-flex items-center gap-2 font-bold text-gray-900 border-b border-purple-500 pb-1 hover:text-purple-700 transition-colors">
                What an MLOps consultant actually does <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {[
                ["Manual releases", "Deployments depend on undocumented steps, individual knowledge, or direct production changes."],
                ["No reliable rollback", "A bad model or pipeline release cannot be restored quickly to a known-good state."],
                ["Unclear production version", "The team cannot confidently connect the live model to its code, data, configuration, and approval history."],
                ["Weak observability", "You can see server health, but not drift, model quality, cost, or business impact."],
                ["Retraining is ad hoc", "Nobody has defined when to retrain, how to compare candidates, or who promotes a model."],
                ["Governance is catching up", "Sensitive data, audit requirements, approvals, or access controls are becoming part of the production requirement."],
              ].map(([title, description]) => (
                <article key={title} className="bg-white border border-gray-200 p-7 min-h-48">
                  <h3 className="font-bold text-lg mb-3">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-white" aria-labelledby="stack-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 mb-16 items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center space-x-3 mb-7">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700">Technology Fit</span>
              </div>
              <h2 id="stack-heading" className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]">
                MLOps tools chosen for the system, not for the logo list.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-gray-600 leading-relaxed">
                We use cloud-native and open-source tooling where it makes operational sense. Existing infrastructure is reused when replacing it would add more risk than value.
              </p>
            </div>
          </div>

          <div className="border-t-2 border-gray-900">
            {stack.map(([area, tools]) => (
              <div key={area} className="grid md:grid-cols-12 gap-4 py-5 border-b border-gray-200 items-center">
                <div className="md:col-span-4 font-bold text-gray-900">{area}</div>
                <div className="md:col-span-8 text-gray-600">{tools}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-purple-50 border-y border-purple-100" aria-labelledby="company-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center space-x-3 mb-7">
                <div className="h-px w-8 bg-purple-600" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700">How We Work</span>
              </div>
              <h2 id="company-heading" className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-7">
                An MLOps consulting company should leave you with an operating capability.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                The deliverable should not be a diagram your team cannot run. We design around reproducibility, observable production behaviour, explicit release decisions, and documentation that survives the engagement.
              </p>
              <p>
                That means starting with the current workflow and failure modes, then implementing only the controls that materially reduce risk. For some teams that is a lean deployment-and-monitoring setup. For others it is a full platform with registries, automated validation, infrastructure-as-code, governance, and retraining workflows.
              </p>
              <p>
                If your ML capability is part of a broader product, our <Link href="/ai-ml-development" className="font-bold text-purple-800 underline decoration-purple-300 underline-offset-4">AI/ML engineering services</Link> cover the surrounding application, APIs, RAG, LLM integration, and software architecture as well.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-700">MLOps FAQ</span>
            <h2 id="faq-heading" className="text-4xl md:text-6xl font-black tracking-tighter mt-5">Common MLOps consulting questions.</h2>
          </div>

          <div className="border-t border-gray-300">
            {faqs.map((faq) => (
              <article key={faq.question} className="py-8 border-b border-gray-300 grid md:grid-cols-12 gap-5 md:gap-10">
                <h3 className="md:col-span-5 text-xl font-bold leading-tight">{faq.question}</h3>
                <p className="md:col-span-7 text-gray-600 leading-relaxed">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-300">Production ML</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mt-6">
                Have a model in notebooks, staging, or production—and need the operating layer around it?
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-gray-400 leading-relaxed mb-7">
                Bring the current architecture, bottleneck, or failure mode. We can map the smallest practical MLOps path before you commit to a larger platform build.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3.5 font-bold hover:bg-purple-300 transition-colors">
                Discuss Your MLOps Architecture <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
