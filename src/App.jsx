import React from "react";
import styles from "./App.module.scss";
import DisplayChat from "./components/DisplayChat/DisplayChat";
import NavBar from "./components/NavBar/NavBar";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import { DisplayVideosList } from "./components/DisplayVideosList/DisplayVideosList";
import { PlayerProvider } from "./contexts/PlayerProvider";

function App() {
  return (
    <PlayerProvider>
      <div className={styles.appContainer}>
        <NavBar />
        <div className={styles.mainContainer}>
          <DisplayVideosList />
          <VideoPlayer />
          <DisplayChat />
        </div>
      </div>
    </PlayerProvider>
  );
}

export default App;
