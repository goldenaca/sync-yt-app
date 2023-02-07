import { useCallback, useContext, useEffect, useState } from "react";
import { sendMessageEvent } from "../../../api/socketEvents";
import { PlayerContext } from "../../../contexts/PlayerProvider";
import { chatChannel } from "../../../utilites/constant";

export const useChat = () => {
  const [inputState, setInputState] = useState("");
  const { values, action } = useContext(PlayerContext);
  const { showChat, messagesList, socket, roomId, user } = values;

  const handleOpenChat = useCallback(() => {
    action.setShowChat(!showChat);
  }, [action, showChat]);

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      sendMessageEvent({ socket, user, message: inputState, type: "user" });
      action.setMessagesList((prev) => [
        ...prev,
        {
          messageType: "internal",
          messageContent: inputState,
          messageOwner: user,
        },
      ]);
      setInputState("");
    },
    [action, inputState, socket, user]
  );

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.on(chatChannel, (message) => {
      action.setMessagesList((prev) => [...prev, message]);
    });

    return () => socket.off(chatChannel);
  }, [action, roomId, socket]);

  return {
    handleOpenChat,
    handleSendMessage,
    setInputState,
    inputState,
    showChat,
    messagesList,
  };
};
