import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../api/api.js";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6328, lng: 77.2183 }); // Default to NSUT
  const [routePoints, setRoutePoints] = useState([]); // For storing route points
  const [mapStyle, setMapStyle] = useState("roadmap"); // For toggling map styles
  const [profile, setProfile] = useState(null);
  const [routeMetrics, setRouteMetrics] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await api.getUserProfile();

        setProfile(data.user);
      } catch (error) {
        console.error(error.message, "Profile Fetching failed");
      }
    };
    fetchUserData();
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isSearching,
        setIsSearching,
        mapCenter,
        setMapCenter,
        routePoints,
        setRoutePoints,
        mapStyle,
        setMapStyle,
        profile,
        setProfile,
        routeMetrics, 
        setRouteMetrics
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook for easy access across our pages/components
/* eslint-disable-next-line react-refresh/only-export-components */
export const useLayout = () => useContext(LayoutContext);
