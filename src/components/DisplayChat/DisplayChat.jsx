import React from "react";
import { Chat } from "./components/Chat/Chat";
import { ChatTag } from "./components/ChatTag/ChatTag";
import { ProfileSection } from "./components/ProfileSection/ProfileSection";
import { SendMessage } from "./components/SendMessage/SendMessage";
import { useChat } from "./hooks/useChat";
import styles from "./styles/displayChat.module.scss";

const DisplayChat = () => {
  const {
    handleOpenChat,
    handleSendMessage,
    setInputState,
    showChat,
    messagesList,
    inputState,
  } = useChat();

  return (
    <div className={showChat ? styles.visible : styles.hidden}>
      <ChatTag handleOpenChat={handleOpenChat} />
      <div className={styles.chatContainer}>
        <ProfileSection />
        <Chat messagesList={messagesList} />
        <SendMessage
          handleSendMessage={handleSendMessage}
          setInputState={setInputState}
          inputState={inputState}
        />
      </div>
    </div>
  );
};

export default DisplayChat;
