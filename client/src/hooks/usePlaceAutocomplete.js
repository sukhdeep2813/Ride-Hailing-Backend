import { useState, useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export const usePlaceAutocomplete = () => {
  const placesLibrary = useMapsLibrary("places");
  const [predictions, setPredictions] = useState([]);

  // Keep track of the session token and the service class instance
  const sessionToken = useRef(null);
  const placesClasses = useRef(null);

  useEffect(() => {
    if (!placesLibrary) return;

    // Cache references to the New Places classes
    placesClasses.current = placesLibrary;

    // Generate a secure session token to bundle multiple keystrokes as 1 request bill
    sessionToken.current = new placesLibrary.AutocompleteSessionToken();
  }, [placesLibrary]);

  const fetchPredictions = async (input) => {
    if (!input || !placesClasses.current) {
      setPredictions([]);
      return;
    }

    try {
      // 💡 NEW PLACES (NEW) METHOD IMPLEMENTATION
      const response =
        await placesClasses.current.AutocompleteSuggestion.fetchAutocompleteSuggestions(
          {
            input,
            sessionToken: sessionToken.current,
            // Optional country bounding restriction
            includedRegionCodes: ["in"],
          },
        );

      if (response && response.suggestions) {
        setPredictions(response.suggestions);
      } else {
        setPredictions([]);
      }
    } catch (error) {
      console.error("Google Places (New) Fetch Failure:", error);
      setPredictions([]);
    }
  };

  const clearPredictions = () => setPredictions([]);

  // Call this specifically when the user chooses a final route path selection
  const refreshSessionToken = () => {
    if (placesClasses.current) {
      sessionToken.current =
        new placesClasses.current.AutocompleteSessionToken();
    }
  };

  return {
    predictions,
    fetchPredictions,
    clearPredictions,
    refreshSessionToken,
  };
};
