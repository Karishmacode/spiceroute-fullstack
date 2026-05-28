import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, XCircle } from "lucide-react";
import logo from "/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@spiceroute.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email !== "admin@spiceroute.com" || password !== "123456") {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("adminToken", "demo-token");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[radial-gradient(circle_at_top,#0f1f46_0%,#070b14_45%,#050816_100%)]">
      {error && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 shadow-xl">
          <XCircle size={18} />
          <span className="text-sm font-bold">{error}</span>

          <button onClick={() => setError("")} className="text-red-300">
            ✕
          </button>
        </div>
      )}

      <div className="w-full max-w-md rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img
            src={logo}
            alt="SpiceRoute"
            className="w-16 h-16 object-contain"
          />

          <h1 className="text-3xl font-black mt-3 text-white">
            <span className="text-[#ff7a00]">Spice</span>Route
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Admin Dashboard Login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-[#ff7a00]"
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white outline-none focus:border-[#ff7a00]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={18} className="text-slate-400" />
              ) : (
                <Eye size={18} className="text-slate-400" />
              )}
            </button>
          </div>

          <div className="rounded-xl bg-[#ff7a00]/10 border border-[#ff7a00]/20 p-3 text-sm">
            <p className="text-[#ff7a00] font-bold">Demo Login</p>
            <p className="text-slate-300">Email: admin@spiceroute.com</p>
            <p className="text-slate-300">Password: 123456</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#ff7a00] hover:bg-[#ff8c1f] font-bold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;