import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

//Doing this because of vite ignoring google mapi api key in .env file. This is a workaround to make it work. We are manually loading the env file and defining the key in the config file. This way we can access the key in our frontend code using import.meta.env.VITE_GOOGLE_MAPS_API_KEY.
