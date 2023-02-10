import { useCallback, useContext, useEffect, useState } from "react";
import { sendMessageEvent } from "../../../api/socketEvents";
import { PlayerContext } from "../../../contexts/PlayerProvider";
import { chatChannel } from "../../../utilites/constant";

export const useChat = () => {
  const [inputState, setInputState] = useState("");
  const [userInput, setUserInput] = useState("");
  const [editView, setEditView] = useState(false);
  const { values, action } = useContext(PlayerContext);
  const { showChat, messagesList, socket, roomId, user } = values;

  const handleOpenChat = useCallback(() => {
    action.setShowChat(!showChat);
  }, [action, showChat]);

  const toggleEditView = useCallback(() => {
    setEditView((prev) => !prev);
  }, []);

  const updateUser = useCallback(
    (e) => {
      e.preventDefault();
      action.setUser(userInput);
      toggleEditView();
      setUserInput("");
    },
    [action, toggleEditView, userInput]
  );

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      sendMessageEvent({ socket, user, message: inputState, roomId });
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
    [action, inputState, roomId, socket, user]
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
    toggleEditView,
    updateUser,
    setUserInput,
    userInput,
    user,
    editView,
    inputState,
    showChat,
    messagesList,
  };
};
