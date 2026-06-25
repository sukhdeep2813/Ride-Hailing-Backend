import { useEffect, useState } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useLayout } from "../context/LayoutContext";

const MapDirectionsRenderer = ({ pickup, destination }) => {
  const map = useMap();
  // Fetch Google's core routing library seamlessly via vis.gl hooks
  const routesLibrary = useMapsLibrary("routes");
  const { setRouteMetrics } = useLayout();

  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // Initialize Google's internal constructor routing services
  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionsService(new routesLibrary.DirectionsService());

    const renderer = new routesLibrary.DirectionsRenderer({
      map: map,
      suppressMarkers: false, // Set to true if you want to use your own custom AdvancedMarker design
      polylineOptions: {
        strokeColor: "#0a20a1", // MetroBolt Brand Orange Route Line
        strokeOpacity: 0.8,
        strokeWeight: 5,
      },
    });
    setDirectionsRenderer(renderer);

    // Clean up route line when component unmounts
    return () => renderer.setMap(null);
  }, [routesLibrary, map]);

  // Fetch and draw route whenever pickup or destination updates
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !pickup || !destination)
      return;

    directionsService.route(
      {
        origin: pickup,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          // Draws the line and places default 'A' and 'B' pins automatically
          directionsRenderer.setDirections(result);

          console.log(result);

          // Automatically adjust camera zoom bounds to fit both markers perfectly on screen
          const bounds = result.routes[0].bounds;
          map.fitBounds(bounds);

          const routeLeg = result.routes[0].legs[0];

          setRouteMetrics({
            distanceKm: routeLeg.distance.value / 1000,
            durationMin: Math.ceil(routeLeg.duration.value / 60),
          });

          console.log("Calculated Route Metrics:", {
            km: routeLeg.distance.value / 1000,
            mins: Math.ceil(routeLeg.duration.value / 60),
          });
        } else {
          console.error("Directions request failed due to: ", status);
          setRouteMetrics(null);
        }
      },
    );
  }, [
    directionsService,
    directionsRenderer,
    pickup,
    destination,
    map,
    setRouteMetrics,
  ]);

  return null; //this component is purely functional and doesn't render any JSX itself. It interacts directly with the Google Maps API to draw routes on the map based on the provided pickup and destination coordinates.
};

export default MapDirectionsRenderer;
