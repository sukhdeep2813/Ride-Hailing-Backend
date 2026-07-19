import React, { createContext, useContext, useEffect, useState } from "react";

import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  //to mount only once when first moubnt to the DOM

  useEffect(() => {
    const connectionUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

    console.log(`🔌 Initializing global WebSocket link: ${connectionUrl}`);

    const newSocket = io(connectionUrl, {
      transports: ["websocket"],
      autoConnect: true,
    });

    setSocket(newSocket);

    //clean when it terminates
    return () => {
      newSocket.close();
      console.log("🔌 Global WebSocket connection terminated.");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocket must be used within a stable SocketProvider context wrapping",
    );
  }
  return context;
};
