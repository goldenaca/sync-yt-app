import React from "react";
import styles from "./profileSection.module.scss";
import avatarImage from "../../../../assets/images/user.png";
import { FaEdit } from "react-icons/fa";

export const ProfileSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <img alt="user" src={avatarImage} className={styles.avatar} />
        <p className={styles.user}> User 21145 </p>
      </div>
      <FaEdit title="Edit username" className={styles.edit} />
    </div>
  );
};
