import React from "react";
import styles from "./chatTag.module.scss";

export const ChatTag = ({ handleOpenChat }) => {
  return (
    <p className={styles.showBtn} onClick={handleOpenChat}>
      <span className={styles.tag}>CHAT</span>
    </p>
  );
};
