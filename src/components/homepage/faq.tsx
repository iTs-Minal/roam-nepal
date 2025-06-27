"use client";

import { useState } from "react";

export default function FAQs() {
  const faqs = [
    {
      question: "What is Roam Nepal?",
      answer: "Roam Nepal is a tourism platform to explore destinations, activities, accommodations, and religious sites in Nepal."
    },
    {
      question: "How do I book accommodations or activities?",
      answer: "Visit the individual page of the accommodation or activity and click the 'Book Now' button."
    },
    {
      question: "Can I leave reviews or ratings?",
      answer: "Yes. On individual place or activity pages, you can rate and review them. This helps other travelers."
    },
    {
      question: "Is Roam Nepal useful for locals too?",
      answer: "Absolutely! Locals can discover hidden gems, book staycations, or plan trips across Nepal."
    },
    {
      question: "Are the listed accommodations verified?",
      answer: "Yes, we verify listings to ensure reliable service. However, we also recommend checking user reviews."
    },
    {
      question: "Is Roam Nepal free to use?",
      answer: "Yes, Roam Nepal is completely free for users to browse and explore."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-12 space-y-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-100 transition"
            >
              <span className="text-base font-medium">{faq.question}</span>
              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 border-t text-sm text-gray-700 bg-gray-50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
