import React from "react";
import MapContainer from "../components/MapContainer";
import { APIProvider } from "@vis.gl/react-google-maps";

const MapDashboard = () => {
  console.log(
    "Loaded API Key Status:",
    !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  );
  console.log("What Vite actually sees:", import.meta.env);
  console.log(import.meta.env);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="w-full h-full relative">
        <MapContainer />
      </div>
    </APIProvider>
  );
};

export default MapDashboard;
