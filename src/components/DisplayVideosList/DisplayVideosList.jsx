import React, { useContext } from "react";
import { loadLocalVideoHandler } from "../../contexts/helpers/helpers";
import { PlayerContext } from "../../contexts/PlayerProvider";
import styles from "./styles/displayvideos.module.scss";

export const DisplayVideosList = () => {
  const { values, action } = useContext(PlayerContext);
  const { roomId, socket, searchResult, player } = values;

  const submitVideoHandler = (id) => {
    loadLocalVideoHandler({ roomId, player, socket, newVideoId: id });
    action.setSearchResult(["clearSearchInput"]);
  };

  return (
    <ul className={searchResult.length > 1 ? styles.visible : styles.hidden}>
      {searchResult.length > 1 &&
        searchResult.map((video) => (
          <li
            key={video.id}
            className={styles.video}
            onClick={() => submitVideoHandler(video.id)}
          >
            <img
              src={video.videoImage.url}
              alt="yt-thumb"
              className={styles.videoImage}
            />
            <div className={styles.infoContainer}>
              <h3>{video.title}</h3>
              <p>{video.channelTitle}</p>
            </div>
          </li>
        ))}
    </ul>
  );
};
