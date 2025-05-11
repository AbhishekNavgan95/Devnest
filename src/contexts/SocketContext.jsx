// src/context/SocketContext.jsx
import { BASE_URL } from "@/lib/utils";
import { useUserStore } from "@/stores/useUserStore";
import React, { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

// singleton socket instance
export const socket = io(BASE_URL);

export const SocketProvider = ({ children }) => {
  const { user } = useUserStore()

  useEffect(() => {
    if (user?._id) {
      socket.connect();
      console.log("✅ Socket connected");

      return () => {
        socket.disconnect();
        console.log("❌ Socket disconnected");
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// custom hook for consuming socket
export const useSocket = () => useContext(SocketContext);