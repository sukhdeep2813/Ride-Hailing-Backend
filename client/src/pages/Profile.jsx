import React, { useState } from "react";
import { Pencil, Star, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { useLayout } from "../context/LayoutContext";
import { api } from "../api/api";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { profile, setProfile } = useLayout();

  // 1. Interactive Form States
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [fullName, setFullName] = useState(() => profile?.name || "");
  const [phone, setPhone] = useState(() => profile?.phone || "+91 XXXXX XXXXX");

  const handleCancel = (field) => {
    switch (field) {
      case "name":
        setIsEditingName(false);
        setFullName(profile.name);
        break;

      case "phone":
        setIsEditingPhone(false);
        setPhone(profile?.phone || "+91 XXXXX XXXXX");
        break;

      case "all":
        setIsEditingName(false);
        setIsEditingPhone(false);

        setFullName(profile?.name || "");
        setPhone(profile?.phone || "+91 XXXXX XXXXX");

        break;
    }
  };

  const handleSave = async () => {
    setIsEditingName(false);
    setIsEditingPhone(false);

    const updatedData = {
      name: fullName,
      phone: phone,
    };

    try {
      console.log("Saving to Prisma Backend...", updatedData);

      const response = await api.updateUserProfile(updatedData);

      if (setProfile && response.user) {
        setProfile(response.user);
      }

      toast.success(
        `Hi ${response.user.name.split(" ")[0]}, profile updated successfully!`,
        {
          duration: 4000,
          position: "top-right",
          style: {
            background: "#121212",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: "500",
            padding: "12px 24px",
          },
          iconTheme: {
            primary: "#228036",
            secondary: "#fff",
          },
        },
      );
    } catch (error) {
      console.error(error.message, "Profile sync faild");
      toast.error("Could not update profile changes.", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#1c1212",
          color: "#ff5252",
          border: "1px solid rgba(255, 82, 82, 0.15)",
          borderRadius: "14px",
          fontSize: "14px",
          fontWeight: "500",
          padding: "12px 24px",
        },
      });

      if (profile) {
        setFullName(profile.name || "");
        setPhone(profile.phone || "");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-8">
      {/* Main Container Wrapper */}
      <div className="max-w-5xl mx-auto bg-linear-to-br from-[#121212] to-black border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        {/* Decorative Badge Element */}
        <div className="absolute top-0 right-0 p-8 opacity-5 hidden md:block">
          <ShieldCheck size={180} />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
          Your Profile
        </h1>

        {/* Profile Top Section */}
        <div className="flex flex-col items-center text-center mb-10">
          {/* Avatar with layout styling */}
          <div className="relative group">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-zinc-800 text-[#FF5722] border border-white/10 flex items-center justify-center text-5xl font-bold mb-4 shadow-xl shadow-black/40">
              {profile ? profile.name.charAt(0).toUpperCase() : "M"}
            </div>
            <span className="absolute bottom-4 right-1 bg-emerald-500 rounded-full p-1 border-2 border-[#121212]">
              <CheckCircle2 size={14} className="text-white fill-current" />
            </span>
          </div>

          {/* Name Header with Verified Indicator */}
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {fullName.split(" ")[0]}
            </h2>
            <span className="bg-[#FF5722]/10 text-[#FF5722] text-[10px] px-2 py-0.5 rounded-md font-semibold border border-[#FF5722]/20 uppercase tracking-wider">
              {profile ? profile.role : "User"}
            </span>
          </div>
        </div>

        {/* --- SECTION 1: PERSONAL INFO vs SECURITY --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/10 pb-8">
          {/* Left Column: Personal Information Fields */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-zinc-400 uppercase tracking-wider">
              Personal Information
            </h3>

            <div className="space-y-5">
              {/* Full Name */}
              <div className="flex items-center justify-between gap-4 bg-zinc-900/40 p-3 rounded-xl border border-white/3">
                <div className="flex-1">
                  <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">
                    Full Name
                  </p>
                  {isEditingName ? (
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-zinc-800 border border-orange-500/50 rounded px-2 py-1 text-base w-full focus:outline-none"
                    />
                  ) : (
                    <p className="text-base md:text-lg font-medium text-zinc-200">
                      {fullName}
                    </p>
                  )}
                </div>
                <button
                  onClick={() =>
                    isEditingName
                      ? handleCancel("name")
                      : setIsEditingName(true)
                  }
                  className="text-zinc-500 hover:text-orange-400 transition p-1 cursor-pointer"
                >
                  {isEditingName ? <X size={18} /> : <Pencil size={18} />}
                </button>
              </div>

              {/* Phone Field */}
              <div className="flex items-center justify-between gap-4 bg-zinc-900/40 p-3 rounded-xl border border-white/3">
                <div className="flex-1">
                  <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  {isEditingPhone ? (
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-zinc-800 border border-orange-500/50 rounded px-2 py-1 text-base w-full focus:outline-none"
                    />
                  ) : (
                    <p className="text-base md:text-lg font-medium text-zinc-200">
                      {phone}
                    </p>
                  )}
                </div>
                <button
                  onClick={() =>
                    isEditingPhone
                      ? handleCancel("phone")
                      : setIsEditingPhone(true)
                  }
                  className="text-zinc-500 hover:text-orange-400 transition p-1 cursor-pointer"
                >
                  {isEditingPhone ? <X size={18} /> : <Pencil size={18} />}
                </button>
              </div>

              {/* Email (Read Only Endpoint Connection) */}
              <div className="bg-zinc-900/40 p-3 rounded-xl border border-white/3">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-base md:text-lg font-medium text-zinc-400 break-all">
                  {profile?.email ? profile.email : "example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Account Security & Metrics */}
          <div className="md:border-l md:border-white/10 md:pl-8 space-y-6">
            <h3 className="text-lg font-bold text-zinc-400 uppercase tracking-wider">
              Account Security & Metrics
            </h3>

            <div className="space-y-4">
              {/* Phone Status Badge */}
              <div className="flex items-center justify-between p-3 bg-zinc-900/20 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-zinc-300">
                    Phone Verification Status
                  </p>
                  <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                    Verified
                  </p>
                </div>
                <CheckCircle2
                  size={20}
                  className="text-emerald-500 fill-emerald-500/10"
                />
              </div>

              {/* Identity Token verification badge */}
              <div className="flex items-center justify-between p-3 bg-zinc-900/20 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-zinc-300">
                    Identity Verification
                  </p>
                  <p className="text-xs text-orange-400 font-semibold mt-0.5">
                    dwarka_rd_verify
                  </p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-orange-500 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
                  Live
                </span>
              </div>

              {/* Calendar Metadata tracking */}
              <div className="p-3 bg-zinc-900/20 rounded-xl">
                <p className="text-sm font-medium text-zinc-500">
                  Joined MetroBolt
                </p>
                <p className="text-base font-semibold text-zinc-300 mt-0.5">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Fetching registry metadata..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: EMERGENCY CONTACTS & RATINGS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-white/10 mb-6">
          {/* Emergency Management Card */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-400 uppercase tracking-wider">
              Emergency Contacts
            </h3>
            <button className="border border-white/10 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 transition-all rounded-xl px-5 py-3 text-sm font-medium w-full sm:w-auto shadow-md">
              Add Emergency Contact
            </button>
          </div>

          {/* Rating Engine Render */}
          <div className="md:border-l md:border-white/10 md:pl-8 space-y-2">
            <h3 className="text-lg font-bold text-zinc-400 uppercase tracking-wider">
              Driver/Rider Rating
            </h3>
            <p className="text-zinc-500 text-xs italic">if applicable</p>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-4xl font-black text-amber-400 tracking-tight">
                {profile?.rating !== undefined
                  ? profile.rating.toFixed(1)
                  : "5.0"}
              </span>
              <span className="text-sm text-zinc-400 font-medium">Stars</span>

              <div className="flex text-amber-400 gap-0.5 ml-2">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" className="opacity-40" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Form Submission Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={handleSave}
            className="w-full sm:flex-1 cursor-pointer  bg-[#FF5722] hover:bg-[#E64A19] shadow-lg shadow-orange-600/10 active:scale-[0.99] transition-all py-4 rounded-xl text-base font-bold tracking-wide"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              handleCancel("all");
            }}
            className="w-full sm:w-32 bg-zinc-900 hover:bg-zinc-800 border border-white/10 transition-all py-4 rounded-xl text-base font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* --- DANGER ZONE FOOTER --- */}
        <div className="mt-10 pt-6 border-t border-red-900/30 flex items-center justify-between text-sm">
          <span className="text-zinc-500 font-medium uppercase tracking-wider text-xs">
            Danger Zone
          </span>
          <button className="text-red-500 hover:text-red-400 font-semibold transition hover:underline bg-transparent border-none cursor-pointer">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
