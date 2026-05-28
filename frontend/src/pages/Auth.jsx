import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  const redirectTo = location.state?.from || "/";

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Please enter 10 digit mobile number");
      return;
    }

    setStep("otp");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp !== "123456") {
      alert("Wrong OTP. Use 123456");
      return;
    }

    setStep("name");
  };

 const handleCompleteLogin = async (e) => {
  e.preventDefault();

  if (!name.trim()) {
    alert("Please enter your name");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        mobile: phone,
        otp,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    navigate(redirectTo);
    window.location.reload();
  } catch (error) {
    console.log(error);
    alert("Backend not connected");
  }
};

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#11213f_0%,#070b14_48%,#050816_100%)] flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-[#0b1220] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">

        <div className="hidden lg:block relative bg-[#050816]">
         <img
  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop"
  alt="Food"
  className="w-full h-full object-cover"
/>

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute bottom-10 left-10">
            <h1 className="text-4xl font-extrabold leading-tight">
              Fresh Food, <br />
              <span className="text-[#ff7a00]">Fast Delivery</span>
            </h1>

            <p className="mt-4 text-slate-300 max-w-sm">
              Login with your mobile number and continue ordering your favorite meals.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
       

          <h2 className="text-3xl font-extrabold">
            Login to <span className="text-[#ff7a00]">SpiceRoute</span>
          </h2>

          <p className="text-slate-400 mt-2">
            Use demo OTP: <span className="text-white font-bold">123456</span>
          </p>

          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
              <div>
                <label className="text-sm text-slate-300">Mobile Number</label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                    setPhone(onlyNumbers);
                  }}
                  maxLength={10}
                  placeholder="Enter 10 digit mobile number"
                  className="mt-2 w-full rounded-xl bg-[#111827] border border-white/10 px-4 py-3 text-white outline-none focus:border-[#ff7a00]"
                />
              </div>

              <button className="w-full bg-[#ff7a00] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition">
                Send OTP
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
              <div>
                <label className="text-sm text-slate-300">Enter OTP</label>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                    setOtp(onlyNumbers);
                  }}
                  maxLength={6}
                  placeholder="Enter 123456"
                  className="mt-2 w-full rounded-xl bg-[#111827] border border-white/10 px-4 py-3 text-white outline-none focus:border-[#ff7a00]"
                />
              </div>

              <button className="w-full bg-[#ff7a00] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition">
                Verify OTP
              </button>
            </form>
          )}

          {step === "name" && (
            <form onSubmit={handleCompleteLogin} className="mt-8 space-y-5">
              <div>
                <label className="text-sm text-slate-300">Your Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl bg-[#111827] border border-white/10 px-4 py-3 text-white outline-none focus:border-[#ff7a00]"
                />
              </div>

              <button className="w-full bg-[#ff7a00] hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition">
                Continue
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Auth;