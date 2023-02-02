import React, { useCallback, useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerProvider";
import { Chat } from "./components/Chat/Chat";
import { ChatTag } from "./components/ChatTag/ChatTag";
import { ProfileSection } from "./components/ProfileSection/ProfileSection";
import { SendMessage } from "./components/SendMessage/SendMessage";
import styles from "./styles/displayChat.module.scss";

const DisplayChat = () => {
  const { values, action } = useContext(PlayerContext);
  const { showChat } = values;

  const handleOpenChat = useCallback(() => {
    action.setShowChat(!showChat);
  }, [action, showChat]);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className={showChat ? styles.visible : styles.hidden}>
      <ChatTag handleOpenChat={handleOpenChat} />
      <div className={styles.chatContainer}>
        <ProfileSection />
        <Chat />
        <SendMessage handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default DisplayChat;
