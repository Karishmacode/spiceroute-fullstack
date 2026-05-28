import { Link } from "react-router-dom";
import {
  HelpCircle,
  Phone,
  Mail,
  Clock,
  ArrowLeft,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";


const faqs = [
  {
    question: "Where is my order?",
    answer:
      "You can track your active order from the Track Order page.",
  },
  {
    question: "How do I cancel my order?",
    answer:
      "Orders can only be cancelled before food preparation starts.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Average delivery time is usually between 30-40 minutes.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, refunds are available for failed or cancelled orders.",
  },
];

const Help = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <Sidebar />

      <main className="pt-24 px-4 lg:px-8 max-w-6xl mx-auto pb-12">
      

        <h1 className="text-4xl font-extrabold">
          Help & Support
        </h1>

        <p className="text-slate-400 mt-3 max-w-2xl">
          Need help with your orders, payments or delivery?
          We are here to help you 24/7.
        </p>

        {/* SUPPORT CARDS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <div className="h-14 w-14 rounded-2xl bg-[#ff7a00]/10 flex items-center justify-center">
              <Phone className="text-[#ff7a00]" />
            </div>

            <h2 className="mt-5 text-xl font-extrabold">
              Call Support
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
              Speak directly with our customer support team.
            </p>

            <button className="mt-5 w-full py-3 rounded-2xl bg-[#ff7a00] hover:bg-[#ff9129] font-bold transition">
              +91 9876543210
            </button>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <div className="h-14 w-14 rounded-2xl bg-[#ff7a00]/10 flex items-center justify-center">
              <Mail className="text-[#ff7a00]" />
            </div>

            <h2 className="mt-5 text-xl font-extrabold">
              Email Support
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
              Send your issue details through email support.
            </p>

            <button className="mt-5 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 font-bold transition">
              support@spiceroute.com
            </button>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <div className="h-14 w-14 rounded-2xl bg-[#ff7a00]/10 flex items-center justify-center">
              <Clock className="text-[#ff7a00]" />
            </div>

            <h2 className="mt-5 text-xl font-extrabold">
              Working Hours
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
              Our support team is available every day.
            </p>

            <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4 text-center font-bold">
              24 / 7 Available
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="text-[#ff7a00]" />

            <h2 className="text-2xl font-extrabold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-3xl bg-white/5 border border-white/10 p-6"
              >
                <h3 className="font-extrabold text-lg">
                  {faq.question}
                </h3>

                <p className="text-slate-400 mt-2">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;