import React from "react";
import MapContainer from "../components/MapContainer";
import { APIProvider } from "@vis.gl/react-google-maps";

const MapDashboard = () => {
  //HardCoded API till ERROR
  const VITE_GOOGLE_MAPS_API_KEY = "AIzaSyBx1xwoSyh3IVdT0Jgf0HsUnFCKp4NOEpQ";
  return (
    <APIProvider apiKey={VITE_GOOGLE_MAPS_API_KEY}>
      <div className="w-full h-full relative">
        <MapContainer />
      </div>
    </APIProvider>
  );
};

export default MapDashboard;
