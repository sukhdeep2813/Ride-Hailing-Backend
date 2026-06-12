import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Unified State Control matching Signup architecture
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // 1. FRONTEND SANITIZATION GUARD
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all credentials.");
      return;
    }

    try {
      setIsLoading(true);
      toast.loading("Authenticating your profile...", { id: "login" });

      // 2. DISPATCH PAYLOAD TO YOUR EXPRESS SERVER
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // 3. PERSIST STATE & MOVE TO ENVIRONMENT
      localStorage.setItem("token", data.token);
      toast.success("Welcome back to MetroBolt!", { id: "login" });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Connection refused. Try again later.", {
        id: "login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Left Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 relative z-10">
        <div className="max-w-md w-full mx-auto">
          {/* Logo - Standardized Brand Accent */}
          <Link
            to="/"
            className="text-2xl font-black tracking-tight mb-12 block text-white"
          >
            <span className="p-1.5 bg-[#FF5722]/10 rounded-xl mr-2 text-[#FF5722]">
              ⚡
            </span>
            METRO<span className="text-[#FF5722]">BOLT</span>
          </Link>

          <h2 className="text-4xl font-extrabold mb-2 tracking-tight">
            Welcome back
          </h2>
          <p className="text-zinc-500 mb-8 text-sm">
            Enter your details to access your secure account routing space.
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail size={18} className="absolute left-3.5 text-zinc-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#FF5722] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock size={18} className="absolute left-3.5 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#FF5722] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF5722] hover:bg-[#E54E1E] disabled:bg-zinc-800 disabled:text-zinc-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/10 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
              {!isLoading && (
                <ArrowRight
                  size={16}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              )}
            </button>

            {/* Divider */}
            <div className="relative py-4 flex items-center">
              <div className="grow border-t border-white/5"></div>
              <span className="mx-4 text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
                Or
              </span>
              <div className="grow border-t border-white/5"></div>
            </div>

            {/* Google Social OAuth Integration */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
                }}
                className="flex items-center gap-3 bg-zinc-950 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-zinc-900 border border-white/5 transition shadow-md shadow-black active:scale-[0.98] text-sm font-semibold"
              >
                <img
                  style={{
                    borderRadius: "50%",
                    background: "white",
                    padding: "2px",
                  }}
                  src="https://developers.google.com/identity/images/g-logo.png"
                  width="24"
                  alt="google"
                />{" "}
                Sign in with Google
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#FF5722] hover:underline font-semibold"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Visual Context Image Banner */}
      <div className="hidden lg:flex w-1/2 bg-[#FF5722] relative overflow-hidden items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1570160897040-30430ade2245?q=80&w=2070&auto=format&fit=crop"
          alt="Delhi Streets"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />

        <div className="relative z-10 p-12 text-center">
          <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest text-white">
            ENGINEERED IN DELHI
          </div>
          <h3 className="text-5xl font-black leading-tight mb-4 drop-shadow-md">
            Reliable Rides <br /> for a Busy City.
          </h3>
          <p className="text-orange-100 text-lg opacity-90 font-medium">
            Powered by Redis & Socket.io for real-time accuracy.
          </p>
        </div>

        {/* Dynamic Background Layout Gradients */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-orange-400/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default Login;
