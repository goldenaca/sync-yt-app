import React from "react";
import PropTypes from "prop-types";
import styles from "./message.module.scss";

export const Message = ({ content, type, username }) => {
  return (
    <div className={styles[type]}>
      <p>{username}</p>
      <div>{content}</div>
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
