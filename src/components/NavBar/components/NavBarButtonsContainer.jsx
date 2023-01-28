import React, { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerProvider";
import { Button } from "../../Button/Button";
import styles from "../styles/navbar.module.scss";

export const NavBarButtonsContainer = ({
  joinHandler,
  joinInputRef,
  type,
  setType,
  joinRoomId,
  setJoinRoomId,
  createHandler,
  leaveHandler,
}) => {
  const {
    values: { roomId },
  } = useContext(PlayerContext);

  if (type === "room")
    return (
      <div className={styles.navBtnContainer}>
        <p className={styles.navRoomId}>
          ROOM: <span className={styles.navRoomIdNum}>{roomId}</span>
        </p>
        <Button text={"LEAVE ROOM"} clickHandler={leaveHandler} />
      </div>
    );
  if (type === "join")
    return (
      <form className={styles.navJoinContainer} onSubmit={joinHandler}>
        <input
          ref={joinInputRef}
          value={joinRoomId}
          onChange={(e) => {
            if (e.target.value.length > 4) return;
            setJoinRoomId(e.target.value);
          }}
          type="number"
          className={styles.navJoinInput}
          placeholder="Room ID..."
        />
        <Button text={"JOIN"} type={"join"} clickHandler={joinHandler} />
      </form>
    );
  return (
    <div className={styles.navBtnContainer}>
      <Button text={"CREATE ROOM"} clickHandler={createHandler} />
      <Button
        text={"JOIN ROOM"}
        clickHandler={() => {
          setType("join");
          setTimeout(() => {
            joinInputRef.current.focus();
          }, 250);
        }}
      />
    </div>
  );
};
