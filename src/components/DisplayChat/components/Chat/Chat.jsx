import React from "react";
import { Message } from "../Message/Message";
import styles from "./chat.module.scss";

export const Chat = ({ messagesList }) => {
  return (
    <div className={styles.container}>
      {messagesList.map((item, i) => (
        <Message
          key={i}
          type={item.messageType}
          content={item.messageContent}
          username={item.messageOwner}
        />
      ))}
    </div>
  );
};
