import React from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import Glassmorphism from "../components/Glassmorphism";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

      {/* Navbar */}
      <NavBar />
      {/* Hero Section */}
      <HeroSection />

      {/* Glassmorphism Feature Grid */}
      <Glassmorphism />

      {/* Footer / Network Section */}
      <Footer />
    </div>
  );
};

export default Landing;
