export const PlaceExtractorForPickupAnsDestination = (input) => {
  if (!input) return "";

  // 1. If it's already a plain text string, return it directly!
  if (typeof input === "string") {
    return input.trim();
  }

  // 2. If it's a Google Place Prediction object, extract standard text
  if (typeof input.placePrediction?.text?.text === "string") {
    return input.placePrediction.text.text;
  }

  if (typeof input.description === "string") {
    return input.description;
  }

  // 3. Fallback: Dynamic reflection loop (No minified key dependencies!)
  if (typeof input === "object") {
    for (const key in input) {
      const val = input[key];

      // Direct array match
      if (Array.isArray(val) && typeof val[0] === "string") {
        return val[0];
      }

      // Nested object search
      if (val && typeof val === "object") {
        for (const subKey in val) {
          if (
            Array.isArray(val[subKey]) &&
            typeof val[subKey][0] === "string"
          ) {
            return val[subKey][0];
          }
        }
      }
    }
  }

  return "";
};
