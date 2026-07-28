// Base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fetchWithAuth = async (endpoint, options = {}) => {
  // 1. Get token from localStorage
  const token = localStorage.getItem("token");

  // 2. Prepare headers cleanly (defaulting options.headers to empty object)
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    // 3. Execute fetch
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // 4. Handle 401 Unauthorized (Token expired/invalid)
    if (response.status === 401) {
      localStorage.removeItem("token");
      // Redirecting  to login or trigger auth state cleanup
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }

    // 5. Handle empty responses (e.g., 204 No Content)
    const contentType = response.headers.get("content-type");
    let data = null;

    if (contentType && contentType.includes("application/json")) {
      const text = await response.text();
      data = text ? JSON.parse(text) : {};
    } else {
      // Fallback for non-JSON or plain text responses
      const text = await response.text();
      data = { message: text || response.statusText };
    }

    // 6. Handle HTTP error status codes (4xx, 5xx)
    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          `Request failed with status ${response.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
};

// Exporting API methods object
export const api = {
  getUserProfile: () => fetchWithAuth("/auth/profile", { method: "GET" }),

  updateUserProfile: (updatedFields) =>
    fetchWithAuth("/auth/profile/update", {
      method: "PUT",
      body: JSON.stringify(updatedFields),
    }),

  calculateRidesFares: (metrics) =>
    fetchWithAuth("/fare/calculate", {
      method: "POST",
      body: JSON.stringify(metrics),
    }),

  getRideHistory: () => fetchWithAuth("/rides/history", { method: "GET" }),

  createRideBooking: (rideData) =>
    fetchWithAuth("/rides/create", {
      method: "POST",
      body: JSON.stringify(rideData),
    }),

  getPendingRides: () => fetchWithAuth("/rides/pending", { method: "GET" }),

  acceptRideJob: (rideId) =>
    fetchWithAuth(`/rides/accept/${rideId}`, { method: "PATCH" }),
  getNearbyDrivers: (lat, lng, radiusKm) => fetchWithAuth(`/drivers/nearby?lat=${lat}&lng=${lng}&radiusKm=${radiusKm}`, {method: "GET"}),
};
