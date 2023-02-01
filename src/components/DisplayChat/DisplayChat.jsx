import React, { useCallback, useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerProvider";
import { ChatTag } from "./components/ChatTag/ChatTag";
import { SendMessage } from "./components/SendMessage/SendMessage";
import styles from "./styles/displayChat.module.scss";

const DisplayChat = () => {
  const { values, action } = useContext(PlayerContext);
  const { showChat } = values;

  const handleOpenChat = useCallback(() => {
    action.setShowChat(!showChat);
  }, [action, showChat]);

  const handleSendMessage = useCallback(() => {}, []);

  return (
    <div className={showChat ? styles.visible : styles.hidden}>
      <ChatTag handleOpenChat={handleOpenChat} />
      <div className={styles.chatContainer}>
        <SendMessage handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default DisplayChat;
