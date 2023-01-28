import React from "react";
import { dynamicPadding } from "./helpers/helpers";
import { usePlayer } from "./hooks/usePlayer";
import styles from "./styles/videoPlayer.module.scss";

const VideoPlayer = () => {
  const { showChat, searchResult, playerContainer } = usePlayer();

  return (
    <div className={dynamicPadding({ showChat, searchResult })}>
      <div className={styles.videoDisplay} ref={playerContainer}></div>
    </div>
  );
};

export default VideoPlayer;
