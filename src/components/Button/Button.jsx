import React from "react";
import PropTypes from "prop-types";
import styles from "./styles/button.module.scss";

export const Button = ({ type, text, clickHandler }) => {
  return (
    <button className={styles[type]} onClick={clickHandler}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "default",
  clickHandler: () => {},
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
