import { useEffect } from "react";
import { chatChannel } from "../../../utilites/constant";

export const useChat = ({ roomId, socket, messagesList }) => {
  useEffect(() => {
    if (!socket || !roomId) return;

    socket.on(chatChannel, () => {
      console.log("chat loaded");
    });

    return () => socket.off(chatChannel);
  }, [roomId, socket]);

  return {};
};
