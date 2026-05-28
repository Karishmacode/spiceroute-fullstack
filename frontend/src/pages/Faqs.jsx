import { HelpCircle } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import PageHero from "../components/common/PageHero";
import Footer from "../components/layout/Footer";


const Faqs = () => {
  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order from the Orders or Track Order page after placing an order.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes between 25–45 minutes depending on distance and restaurant preparation time.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, orders can be cancelled before restaurant preparation starts.",
    },
    {
      question: "How do I use coupon codes?",
      answer:
        "Apply your coupon code during checkout to receive discounts and offers.",
    },
    {
      question: "When will I get my refund?",
      answer:
        "Refunds are generally processed within 3–7 business days.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      <Navbar />
      

      <main className="flex-1 pt-24 xl:pl-64 px-4 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <PageHero
            icon={HelpCircle}
            label="Support"
            title="Frequently Asked Questions"
            description="Find answers to common questions related to orders, delivery, refunds, and payments."
          />

          <section className="space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-3xl bg-white/5 border border-white/10 p-6"
              >
                <h2 className="text-xl font-extrabold">
                  {faq.question}
                </h2>

                <p className="mt-3 text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Faqs;