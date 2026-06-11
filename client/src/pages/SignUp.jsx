import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State Values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // 1. FRONTEND SANITIZATION VALIDATION GUARDS
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all registration fields.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      setIsLoading(true);
      toast.loading("Creating your MetroBolt account...", { id: "signup" });

      // 2. DISPATCH REGISTRATION PAYLOAD TO YOUR EXPRESS SERVER
      // Replace with your exact Axios instance / API route wrapper later
     const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      // 3. PERSIST AUTHENTICATION STATE
      localStorage.setItem("token", data.token);

      toast.success(`Welcome to MetroBolt, ${name}!`, { id: "signup" });

      // 4. ROUTE STRAIGHT INTO THE CORE MAP ENVIRONMENT
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Network error. Please try again later.", {
        id: "signup",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        {/* Branding & Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-[#FF5722] font-black text-xl tracking-tight mb-2">
            <span className="p-1.5 bg-[#FF5722]/10 rounded-xl">⚡</span>{" "}
            MetroBolt
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
            Create your account
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Join the network to track and book premium rides.
          </p>
        </div>

        <form onSubmit={handleSignupSubmit} className="space-y-4">
          {/* FULL NAME INPUT */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User size={18} className="absolute left-3.5 text-zinc-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Sukhdeep Singh"
                className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-white/5 rounded-xl text-sm focus:outline-none focus:border-[#FF5722] transition-colors"
              />
            </div>
          </div>

          {/* EMAIL INPUT */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail size={18} className="absolute left-3.5 text-zinc-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-white/5 rounded-xl text-sm focus:outline-none focus:border-[#FF5722] transition-colors"
              />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={18} className="absolute left-3.5 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Minimum 8 characters"
                className="w-full pl-11 pr-12 py-3 bg-zinc-950 border border-white/5 rounded-xl text-sm focus:outline-none focus:border-[#FF5722] transition-colors"
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

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF5722] hover:bg-[#E54E1E] disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold py-3 px-4 rounded-xl transition-all mt-6 flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-orange-500/10"
          >
            {isLoading ? "Registering..." : "Sign Up"}
            {!isLoading && (
              <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </form>

        {/* FOOTER SWITCH BUTTON */}
        <div className="mt-6 text-center text-xs text-zinc-500">
          Already have a MetroBolt profile?{" "}
          <Link
            to="/login"
            className="text-[#FF5722] font-semibold hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
