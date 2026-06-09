import React, { createContext, useState, useContext } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6328, lng: 77.2183 }); // Default to NSUT
  const [routePoints, setRoutePoints] = useState([]); // For storing route points
  const [mapStyle, setMapStyle] = useState("roadmap"); // For toggling map styles

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
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook for easy access across our pages/components
export const useLayout = () => useContext(LayoutContext);
