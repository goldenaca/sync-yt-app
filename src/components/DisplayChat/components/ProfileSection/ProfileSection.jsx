import React from "react";
import styles from "./profileSection.module.scss";
import avatarImage from "../../../../assets/images/user.png";
import { FaEdit } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";
import { Button } from "../../../Button/Button";

export const ProfileSection = ({
  toggleEditView,
  editView,
  updateUser,
  user,
  userInput,
  setUserInput,
}) => {
  return (
    <div className={styles.container}>
      {editView ? (
        <form className={styles.editContainer} onSubmit={updateUser}>
          <input
            maxLength={25}
            value={userInput}
            className={styles.input}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button text="Change!" type="send-message" buttonType="submit" />
          <CgCloseO
            onClick={toggleEditView}
            title="Cancel edit."
            className={styles.cancel}
          />
        </form>
      ) : (
        <>
          <div className={styles.userContainer}>
            <img alt="user" src={avatarImage} className={styles.avatar} />
            <p className={styles.user}>{user}</p>
          </div>
          <FaEdit
            onClick={toggleEditView}
            title="Edit username."
            className={styles.edit}
          />
        </>
      )}
    </div>
  );
};
