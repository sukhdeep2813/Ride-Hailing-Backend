import React, { createContext, useState, useContext } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6328, lng: 77.2183 }); // Default to NSUT

  return (
    <LayoutContext.Provider
      value={{ isSearching, setIsSearching, mapCenter, setMapCenter }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook for easy access across our pages/components
export const useLayout = () => useContext(LayoutContext);
