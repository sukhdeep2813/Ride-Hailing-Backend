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
  const data = await response.json();

  //error handing
  if (!response.ok) {
    throw new Error(data.message || "Server communication failure.");
  }

  //returns data
  return data;
};

//exporting api as an object
export const api = {
  getUserProfile: () => fetchWithAuth("/auth/Dashboard", { method: "GET" }),
};
