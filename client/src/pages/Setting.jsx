import React, { useState } from "react";
import { 
  Sliders, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Info, 
  Trash2, 
  ChevronRight 
} from "lucide-react";

const Setting = () => {
  // 1. Local State for App Preferences Toggles        DUMMY FOR NOW - no actual functionality yet, just UI state
  const [theme, setTheme] = useState(true); // true = Dark, false = Light
  const [notifications, setNotifications] = useState(true);
  const [mapType, setMapType] = useState("Default");
  const [sharedData, setSharedData] = useState(true);

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-8">
      {/* Main Container */}
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#121212] to-black border border-white/10 rounded-3xl p-6 md:p-8">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
          App Settings
        </h1>

        <div className="space-y-6">
          
          {/* --- SECTION 1: APP PREFERENCES --- */}
          <div className="bg-zinc-900/30 border border-white/[0.04] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
              <Sliders size={18} className="text-[#FF5722]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                App Preferences
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Theme Switch */}
              <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-white/[0.02]">
                <div>
                  <p className="text-sm font-semibold text-zinc-200">Theme Mode</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{theme ? "Dark Mode" : "Light Mode"}</p>
                </div>
                <button 
                  onClick={() => setTheme(!theme)}
                  className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 ${theme ? "bg-[#FF5722]" : "bg-zinc-700"}`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${theme ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              {/* Notifications Switch */}
              <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-white/[0.02]">
                <div>
                  <p className="text-sm font-semibold text-zinc-200">Notification Sounds</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{notifications ? "Enabled" : "Muted"}</p>
                </div>
                <button 
                  onClick={() => setNotifications(!notifications)}
                  className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 ${notifications ? "bg-[#FF5722]" : "bg-zinc-700"}`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${notifications ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              {/* Map Type Dropdown */}
              <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-white/[0.02]">
                <div className="flex-1 mr-2">
                  <p className="text-sm font-semibold text-zinc-200">Map Layout</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Render View</p>
                </div>
                <select 
                  value={mapType}
                  onChange={(e) => setMapType(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-lg p-1.5 text-xs font-medium text-zinc-200 focus:outline-none focus:border-[#FF5722]"
                >
                  <option value="Default">Default</option>
                  <option value="Satellite">Satellite</option>
                  <option value="Terrain">Terrain</option>
                </select>
              </div>
            </div>
          </div>

          {/* --- SECTION 2: ACCOUNT SECURITY --- */}
          <div className="bg-zinc-900/30 border border-white/[0.04] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
              <Lock size={18} className="text-[#FF5722]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                Account Security
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-between flex-1 p-4 bg-zinc-950 hover:bg-zinc-900/50 transition-all rounded-xl border border-white/[0.02] text-left group">
                <div>
                  <p className="text-sm font-semibold text-zinc-200">Update Password</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Change your account security password</p>
                </div>
                <ChevronRight size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
              </button>

              <button className="flex items-center justify-between flex-1 p-4 bg-zinc-950 hover:bg-zinc-900/50 transition-all rounded-xl border border-white/[0.02] text-left group">
                <div>
                  <p className="text-sm font-semibold text-zinc-200">Two-Factor Authentication</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Secure logins with verification codes</p>
                </div>
                <span className="text-[10px] uppercase font-bold bg-zinc-800 text-zinc-400 px-2 py-1 rounded tracking-wide border border-white/5">
                  Setup
                </span>
              </button>
            </div>
          </div>

          {/* --- SECTION 3: LOCATION & PRIVACY --- */}
          <div className="bg-zinc-900/30 border border-white/[0.04] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
              <Eye size={18} className="text-[#FF5722]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                Location & Privacy
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-white/[0.02]">
                <div>
                  <p className="text-sm font-semibold text-zinc-200">Share Telemetry Data</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Anonymized ride analytics engine data</p>
                </div>
                <button 
                  onClick={() => setSharedData(!sharedData)}
                  className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 ${sharedData ? "bg-[#FF5722]" : "bg-zinc-700"}`}
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${sharedData ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              <button className="flex items-center justify-between p-4 bg-zinc-950 hover:bg-zinc-900/40 text-left rounded-xl border border-white/[0.02] group">
                <div>
                  <p className="text-sm font-semibold text-zinc-200">Clear Location Cache</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Wipe all local pickup addresses</p>
                </div>
                <Trash2 size={16} className="text-zinc-500 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>

          {/* --- SECTION 4: SYSTEM METADATA --- */}
          <div className="bg-zinc-900/10 border border-white/[0.02] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3 text-zinc-500">
              <Info size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">About MetroBolt</h4>
            </div>
            <div className="text-xs text-zinc-400 space-y-1 pl-6">
              <p>System Version: <span className="text-zinc-300 font-mono">1.2.5-stable</span></p>
              <p>© 2026 MetroBolt Network Inc. All Rights Reserved.</p>
              <div className="flex gap-3 pt-2 text-[#FF5722] font-semibold">
                <a href="#terms" className="hover:underline">Terms of Service</a>
                <span>•</span>
                <a href="#privacy" className="hover:underline">Privacy Policy</a>
              </div>
            </div>
          </div>

          {/* --- DANGER ZONE --- */}
          <div className="pt-4 border-t border-red-900/20 flex items-center justify-between text-sm">
            <span className="text-zinc-500 font-bold uppercase tracking-wider text-xs">Danger Zone Actions</span>
            <button className="text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5">
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Setting;