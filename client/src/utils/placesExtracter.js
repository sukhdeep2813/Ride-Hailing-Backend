export const PlaceExtractorForPickupAnsDestination = (inputObj) => {
  if (!inputObj) return "";

  try {
    for (const key in inputObj) {
      const subProperty = inputObj[key];

      if (subProperty && subProperty === "object") {
        if (
          Array.isArray(subProperty.Ei) &&
          typeof subProperty.Ei[0] === "string"
        ) {
          return subProperty.Ei[0];
        }
      }
    }
  } catch (err) {
    console.error("Direct array extraction failed:", err);
  }
  return "Select Location";
};
