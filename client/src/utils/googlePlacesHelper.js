// Centralized, nextractor for Google's dynamic structures
export const getPlaceString = (item) => {
  if (!item) return "Unknown Location";
  if (typeof item === "string") return item;

  // 1. Try public unminified property paths first (Places New SDK patterns)
  if (item.placePrediction?.text) return item.placePrediction.text;
  if (item.text?.text) return item.text.text;
  if (item.description) return item.description;

  // 2. Fallback: Safely find the first array that contains your plain text location string
  // This bypasses minified keys like 'oh' or 'Ei' dynamically
  for (const key in item) {
    const value = item[key];
    if (Array.isArray(value) && typeof value[0] === "string") {
      return value[0]; // Returns "Ahmedabad, Gujarat, India" safely!
    }
    // Deep inspection if nested one layer lower   ,  not needed i think 
    // if (value && typeof value === "object") {
    //   for (const subKey in value) {
    //     if (Array.isArray(value[subKey]) && typeof value[subKey][0] === "string") {
    //       return value[subKey][0];
    //     }
    //   }
    // }
  }

  return "Unknown Location";
};
