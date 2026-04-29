import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Left Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 relative z-10">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter mb-12 block"
          >
            METRO<span className="text-blue-500">BOLT</span>
          </Link>

          <h2 className="text-4xl font-extrabold mb-2 tracking-tight">
            Welcome back
          </h2>
          <p className="text-gray-500 mb-8">
            Enter your details to access your account.
          </p>

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="sukhdeep@nsut.ac.in"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 transition"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-500/20 active:scale-[0.98]">
              Sign In
            </button>

            {/* Divider */}
            <div className="relative py-4 flex items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="mx-4 text-gray-600 text-[10px] uppercase tracking-widest font-bold">
                Or
              </span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            {/* Google Integration */}
            <div className="flex justify-center ">
              <button
                onClick={() => {
                  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
                }}
                className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full cursor-pointer hover:bg-gray-800 transition shadow-md shadow-gray-800/20 active:scale-[0.98]"
              >
                <img
                  style={{
                    borderRadius: "50%",
                    background: "white",
                    padding: "2px",
                  }}
                  src="https://developers.google.com/identity/images/g-logo.png"
                  width="30"
                  alt="google"
                />{" "}
                Sign in with Google
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Image (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center">
        {/* Placeholder for Image */}
        <img
          src="https://images.unsplash.com/photo-1570160897040-30430ade2245?q=80&w=2070&auto=format&fit=crop"
          alt="Delhi Streets"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />

        {/* Overlay Tech Content */}
        <div className="relative z-10 p-12 text-center">
          <div className="inline-block px-4 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest">
            ENGINEERED IN DELHI
          </div>
          <h3 className="text-5xl font-black leading-tight mb-4">
            Reliable Rides <br /> for a Busy City.
          </h3>
          <p className="text-blue-100 text-lg opacity-80">
            Powered by Redis & Socket.io for real-time accuracy.
          </p>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default Login;
