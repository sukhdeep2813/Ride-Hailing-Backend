//Base url
const BASE_URL = import.meta.env.VITE_API_URL;
//make a function

const fetchWithAuth = async (endpoint, options) => {
  //  get token  form localStorage
  const token = localStorage.getItem("token");

  //add headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  //send  the request to backend /server
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  //read response '
  const data = await response.json(); //edge case what if we get data empty ??

  //error handing
  if (!response.ok) {
    throw new Error(data.message || "Server communication failure.");
  }

  //returns data
  return data;
};

//exporting api as an object
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
    acceptRideJob : (rideId) => fetchWithAuth(`/rides/accept/${rideId}`, { method: "PATCH" }),
};
