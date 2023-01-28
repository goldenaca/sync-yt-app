import React, { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerProvider";
import styles from "./styles/displayChat.module.scss";

const DisplayChat = () => {
  const { values, action } = useContext(PlayerContext);
  const { showChat } = values;

  return (
    <div className={showChat ? styles.visible : styles.hidden}>
      <div className={styles.tagContainer}>
        <p
          className={styles.showBtn}
          onClick={() => action.setShowChat(!showChat)}
        >
          {showChat ? ">" : "<"}
        </p>
      </div>
      <div className={styles.chatContainer}>show</div>
    </div>
  );
};

export default DisplayChat;
