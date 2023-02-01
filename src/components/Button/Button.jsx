import React from "react";
import PropTypes from "prop-types";
import styles from "./styles/button.module.scss";

export const Button = ({ type, text, clickHandler, buttonType }) => {
  return (
    <button className={styles[type]} onClick={clickHandler} type={buttonType}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  buttonType: "button",
  type: "default",
  clickHandler: () => {},
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
