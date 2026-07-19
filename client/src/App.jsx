import "./App.css";
import Landing from "./pages/Landing";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard"; // Main dashboard wrapper
import MapDashboard from "./pages/MapDashboard"; // Map + Widget here!
import Setting from "./pages/Setting";
import History from "./pages/History";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import { LayoutProvider, useLayout } from "./context/LayoutContext";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/SignUp";
import DriverDashboard from "./components/DriverDashboard";
import { SocketProvider } from "./context/SocketContext";

const DashBoardWrapper = () => {
  const { profile } = useLayout(); // Access the profile from LayoutContext

  // If the profile data is still being loaded by your useEffect hook
  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-t-orange-500 border-zinc-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (profile.role === "DRIVER") {
    return <DriverDashboard />;
  }

  return <MapDashboard />;
};

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 1. Make DashBoard the parent wrapper element */}
        {/*setting LayoutProvider to only DashBoard because  we want to discard MEMORY and to secure /dashBoard */}
        <Route
          path="/dashboard"
          element={
            <LayoutProvider>
              {" "}
              <SocketProvider>
                <DashBoard />
              </SocketProvider>{" "}
            </LayoutProvider>
          }
        >
          {/* 2. When on exactly /dashboard, load the Map & Widget */}
          <Route index element={<DashBoardWrapper />} />

          {/* 3. Sub-routes render inside DashBoard's <Outlet /> */}
          <Route path="settings" element={<Setting />} />
          <Route path="history" element={<History />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
