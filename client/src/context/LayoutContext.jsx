import React, { createContext, useState, useContext } from "react";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <LayoutContext.Provider value={{ isSearching, setIsSearching }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook for easy access across our pages/components
export const useLayout = () => useContext(LayoutContext);
