import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Why should I choose Bridge Homies for my digital strategy?",
    answer:
      "At Bridge Homies, we blend creative storytelling with performance-driven strategy. From high-quality video editing to content calendars and viral trend research — we offer everything you need to grow your brand online.",
  },
  {
    question: "What platforms do you specialize in?",
    answer:
      "We specialize in Instagram, TikTok, YouTube, and Facebook — tailoring content to suit each platform’s unique format, algorithm, and audience behavior.",
  },
  {
    question: "How quickly can I expect results?",
    answer:
      "Most clients begin seeing increased engagement within 2–4 weeks. Viral content may spike sooner depending on trends and timing.",
  },
  {
    question: "Do you offer packages or retainers?",
    answer:
      "Yes! We offer flexible monthly retainers and one-time project packages. Whether you need a single video or full social media management, we can customize a plan for you.",
  },
  {
    question: "Can you help me go viral?",
    answer:
      "We reverse-engineer what works. From trends and hooks to hashtags and timing, we boost your chances of virality with a proven content strategy.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work with beauty salons, coaches, ecommerce brands, influencers, tech startups, and service businesses — helping them grow their presence online.",
  },
];

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-200 pb-4 mb-4 transition-all duration-300"
        >
          <button
            onClick={() => toggle(index)}
            className="flex justify-between items-center w-full text-left"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {faq.question}
            </h3>
            <FaChevronDown
              className={`text-blue-600 transform transition-transform duration-300 ${
                activeIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`mt-3 text-gray-600 text-sm overflow-hidden transition-all duration-300 ${
              activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
