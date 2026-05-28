import { Gift, Copy, Share2 } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const Invite = () => {
  const referralCode = "SPICE200";

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <Sidebar />

      <main className="pt-24 xl:pl-64 px-4 lg:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-[#ff7a00]/20 bg-gradient-to-br from-[#ff7a00]/15 via-[#0b1220] to-[#050816] p-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[#ff7a00]/15 flex items-center justify-center">
                <Gift className="text-[#ff7a00]" size={34} />
              </div>

              <div>
                <h1 className="text-4xl font-extrabold">
                  Invite & Earn
                </h1>

                <p className="text-slate-400 mt-2">
                  Invite your friends and earn up to ₹200 SpiceCash rewards.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-6">
              <p className="text-slate-400 text-sm">
                Your Referral Code
              </p>

              <div className="mt-3 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full rounded-2xl bg-[#0f172a] border border-white/10 px-5 py-4 text-2xl font-black tracking-widest text-[#ff7a00]">
                  {referralCode}
                </div>

                <button
                  onClick={copyCode}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#ff7a00] hover:bg-[#ff9129] font-bold transition flex items-center justify-center gap-2"
                >
                  <Copy size={18} />
                  Copy Code
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                <h2 className="font-extrabold text-xl">
                  Invite Friends
                </h2>

                <p className="mt-3 text-slate-400 text-sm">
                  Share your referral code with friends and family.
                </p>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                <h2 className="font-extrabold text-xl">
                  They Order
                </h2>

                <p className="mt-3 text-slate-400 text-sm">
                  Your friend places their first successful order.
                </p>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                <h2 className="font-extrabold text-xl">
                  Earn Rewards
                </h2>

                <p className="mt-3 text-slate-400 text-sm">
                  You receive ₹200 SpiceCash instantly in your wallet.
                </p>
              </div>
            </div>

           <a
  href={`https://wa.me/?text=🍔 Join SpiceRoute and earn rewards! Use my referral code: ${referralCode} and get exciting food offers. Download now: https://spiceroute.com/invite`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 font-bold transition flex items-center justify-center gap-3"
>
  <Share2 size={18} />
  Share on WhatsApp
</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Invite;