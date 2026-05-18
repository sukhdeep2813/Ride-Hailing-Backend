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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* 1. Make DashBoard the parent wrapper element */}
      <Route path="/dashboard" element={<DashBoard />}>
        {/* 2. When on exactly /dashboard, load the Map & Widget */}
        <Route index element={<MapDashboard />} />

        {/* 3. Sub-routes render inside DashBoard's <Outlet /> */}
        <Route path="settings" element={<Setting />} />
        <Route path="history" element={<History />} />
        <Route path="payments" element={<Payments />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
