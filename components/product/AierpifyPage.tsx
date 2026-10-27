import Link from "next/link";

const capabilities = [
  {
    title: "Invoice creation and tax details",
    description:
      "Create digital invoices with sales tax, withholding, extra-tax, and further-tax fields for the relevant transaction.",
  },
  {
    title: "Validation and submission workflows",
    description:
      "Prepare invoice data for FBR and PRAL e-invoicing workflows, review validation responses, and track invoice status or rejection details.",
  },
  {
    title: "QR and IRN generation",
    description:
      "Generate QR codes and invoice reference numbers as part of the digital invoicing workflow.",
  },
  {
    title: "Product and customer records",
    description:
      "Manage customer and product information, including Excel product imports, to support invoice preparation.",
  },
  {
    title: "Reports and business analytics",
    description:
      "Review invoice activity and business reporting from the platform.",
  },
  {
    title: "Multi-user access",
    description:
      "Provide platform access to multiple users involved in business invoicing workflows.",
  },
];

export default function AierpifyPage() {
  return (
    <section className="space-y-10" aria-labelledby="aierpify-details-heading">
      <header className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-purple-700">
          Pakistani FBR and PRAL e-invoicing platform
        </p>
        <h2 id="aierpify-details-heading" className="text-3xl font-bold tracking-tight text-gray-950">
          Digital invoicing and tax workflows with Aierpify
        </h2>
        <p className="max-w-3xl text-base leading-7 text-gray-600">
          Aierpify supports digital invoice creation, validation and submission workflows for Pakistani businesses. It brings invoice references, tax fields, product and customer records, and status tracking into one platform. Check the product site for current availability and implementation details.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {capabilities.map((capability) => (
          <article key={capability.title} className="border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-950">{capability.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{capability.description}</p>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <a
          href="https://aierpify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gray-950 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700"
        >
          Visit Aierpify
          <span className="ml-2" aria-hidden="true">↗</span>
        </a>
        <a
          href="https://pos.aierpify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-purple-700 hover:text-purple-700"
        >
          Explore Aierpify POS
          <span className="ml-2" aria-hidden="true">↗</span>
        </a>
        <Link
          href="/case-studies/aierpify"
          className="inline-flex items-center border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-gray-950"
        >
          Read the Aierpify case study
          <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
