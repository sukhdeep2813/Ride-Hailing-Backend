import React from "react";
import MapContainer from "../components/MapContainer";
import { APIProvider } from "@vis.gl/react-google-maps";

const MapDashboard = () => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="w-full h-full relative overflow-hidden block">
        <MapContainer />
      </div>
    </APIProvider>
  );
};

export default MapDashboard;
