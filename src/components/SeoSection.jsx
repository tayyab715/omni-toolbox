import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export default function SeoSection({ tool }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    if (!tool) return;

    // Dynamically inject JSON-LD Schema for SoftwareApplication & FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": (tool.article?.faqs || []).map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    };

    const appSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": tool.title,
      "operatingSystem": "All (Web Browser)",
      "applicationCategory": "UtilitiesApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.id = 'faq-schema-jsonld';
    faqScript.text = JSON.stringify(faqSchema);

    const appScript = document.createElement('script');
    appScript.type = 'application/ld+json';
    appScript.id = 'app-schema-jsonld';
    appScript.text = JSON.stringify(appSchema);

    // Remove existing schemas before appending
    document.getElementById('faq-schema-jsonld')?.remove();
    document.getElementById('app-schema-jsonld')?.remove();

    document.head.appendChild(faqScript);
    document.head.appendChild(appScript);

    return () => {
      document.getElementById('faq-schema-jsonld')?.remove();
      document.getElementById('app-schema-jsonld')?.remove();
    };
  }, [tool]);

  if (!tool || !tool.article) return null;

  const { h1, intro, howTo, faqs } = tool.article;

  return (
    <section className="seo-content-section">
      <h2>{h1}</h2>
      <p>{intro}</p>

      <h2>How to use {tool.title} (Step-by-Step Guide)</h2>
      <div className="steps-list">
        {howTo.map((step, idx) => (
          <div className="step-item" key={idx}>
            <div className="step-num">{idx + 1}</div>
            <div style={{ flex: 1 }}>{step}</div>
          </div>
        ))}
      </div>

      {faqs && faqs.length > 0 && (
        <div className="faq-section">
          <h2>Frequently Asked Questions (FAQs)</h2>
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div className="faq-item" key={idx}>
                <div
                  className="faq-question"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {isOpen && <div className="faq-answer">{faq.answer}</div>}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
