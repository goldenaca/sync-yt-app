import React from "react";
import { Message } from "../Message/Message";
import styles from "./chat.module.scss";

export const Chat = () => {
  return (
    <div className={styles.container}>
      <Message
        type="external"
        content="Hola Juanca, como estas. Que vemos hoy ?"
        username="Pedro"
      />
      <Message
        type="internal"
        content="Buenas Juan, hoy vemos Jojos"
        username="Juanca"
      />
      <Message type="event" content="selected a video" username="Pedro" />
    </div>
  );
};
