// Centralized extractor for Google's dynamic structures
export const getPlaceString = (item) => {
  if (!item) return "Unknown Location";
  if (typeof item === "string") return item;

  // 1. Check explicit string endpoints first to protect against object evaluations
  if (typeof item.placePrediction?.text?.text === "string")
    return item.placePrediction.text.text;
  if (typeof item.text?.text === "string") return item.text.text;
  if (typeof item.description === "string") return item.description;

  // 2. Fallback: Dynamic reflection loop to locate embedded text arrays
  for (const key in item) {
    const value = item[key];

    // Top-level array containing a string
    if (Array.isArray(value) && typeof value[0] === "string") {
      return value[0];
    }

    // Nested minified object layer inspection
    if (value && typeof value === "object") {
      for (const subKey in value) {
        if (
          Array.isArray(value[subKey]) &&
          typeof value[subKey][0] === "string"
        ) {
          return value[subKey][0]; // 🟢 Exits with "Ahmedabad, Gujarat, India"
        }
      }
    }
  }

  return "Unknown Location";
};
