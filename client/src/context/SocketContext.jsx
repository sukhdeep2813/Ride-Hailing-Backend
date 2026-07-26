import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// 🟢 1. SINGLETON PATTERN: Initialize OUTSIDE the React component scope.
// This guarantees only ONE persistent connection is ever created in the browser.
const connectionUrl =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const socketInstance = io(connectionUrl, {
  transports: ["websocket"], // Direct WebSocket transport (prevents HTTP polling spam)
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socketInstance.connected);

  useEffect(() => {
    // 🟢 2. Attach event listeners inside the lifecycle sync block
    const onConnect = () => {
      console.log(`✅ WebSocket connected! ID: ${socketInstance.id}`);
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("🔴 WebSocket disconnected");
      setIsConnected(false);
    };

    const onConnectError = (err) => {
      console.warn("⚠️ WebSocket connection error:", err.message);
    };

    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);
    socketInstance.on("connect_error", onConnectError);

    // 🟢 3. IDEMPOTENT CLEANUP: Detach listeners ONLY. Do NOT call socket.close()!
    // This stops React 18 Strict Mode from tearing down the network connection during dev re-renders.
    return () => {
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
      socketInstance.off("connect_error", onConnectError);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketInstance, isConnected }}>
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
