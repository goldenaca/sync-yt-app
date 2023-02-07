import React from "react";
import { Button } from "../../../Button/Button";
import styles from "./sendMessage.module.scss";

export const SendMessage = ({
  handleSendMessage,
  inputState,
  setInputState,
}) => {
  return (
    <form className={styles.container} onSubmit={handleSendMessage}>
      <input
        className={styles.input}
        type="text"
        placeholder="New message..."
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
      />
      <Button text="Send🚀" type="send-message" buttonType="submit" />
    </form>
  );
};
