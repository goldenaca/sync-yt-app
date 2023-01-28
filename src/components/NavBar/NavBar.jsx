import React from "react";
import logo from "../../assets/images/logo.svg";
import throttle from "../../utilites/throttle";
import { NavBarButtonsContainer } from "./components/NavBarButtonsContainer";
import { useRoomsHandler } from "./hooks/useRoomsHandler";
import styles from "./styles/navbar.module.scss";

const NavBar = () => {
  const {
    searchBar,
    joinInputRef,
    type,
    joinRoomId,
    onSearchBarChange,
    setSearchBar,
    leaveHandler,
    joinHandler,
    createHandler,
    setType,
    setJoinRoomId,
  } = useRoomsHandler();

  return (
    <nav className={styles.nav}>
      <div className={styles.logoSearchContainer}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h2 className={styles.navTitle}> Sync YT videos</h2>
        <input
          type="search"
          className={styles.searchBar}
          placeholder="Search video or paste url..."
          value={searchBar}
          onChange={(event) => {
            throttle(onSearchBarChange, 750, event);
            setSearchBar(event.target.value);
          }}
        />
      </div>
      <NavBarButtonsContainer
        joinInputRef={joinInputRef}
        joinRoomId={joinRoomId}
        type={type}
        setType={setType}
        leaveHandler={leaveHandler}
        joinHandler={joinHandler}
        createHandler={createHandler}
        setJoinRoomId={setJoinRoomId}
      />
    </nav>
  );
};

export default NavBar;
