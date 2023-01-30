import { sendPlayerEvent } from "../../../api/socketEvents";
import { loadVideoHandler } from "../../../contexts/helpers/helpers";
import { defaultVideoId } from "../../../utilites/constant";
import { playerChannel } from "../../../utilites/constant";
import styles from "../styles/videoPlayer.module.scss";

export const dynamicPadding = ({ searchResult, showChat }) => {
  if (searchResult.length && showChat)
    return `${styles.videoContainer} ${styles.pRightLeft}`;
  if (showChat) return `${styles.videoContainer} ${styles.pRight}`;
  if (searchResult.length) return `${styles.videoContainer} ${styles.pLeft}`;
  return `${styles.videoContainer}`;
};

export const createPlayer = ({ player, playerContainer }) => {
  player.current = new window.YT.Player(playerContainer.current, {
    videoId: defaultVideoId,
  });
};

export const handleOnPlayerChange = ({
  eventToAvoid,
  event,
  socket,
  roomId,
  player,
}) => {
  if (eventToAvoid.current) {
    if (eventToAvoid.current === event) eventToAvoid.current = null;
    return;
  }
  if (event !== 1 && event !== 2) return;
  const currentTime = player.current.playerInfo.currentTime;

  sendPlayerEvent({
    socket,
    roomId,
    currentTime,
    eventNum: event,
    playerChannel,
  });
};

export function recievePlayerEvent({
  event,
  eventToAvoid,
  player,
  currentData,
}) {
  if (event === "PLAY") {
    eventToAvoid.current = 1;
    player.current.seekTo(Math.round(currentData.time) + 0.5, true);
    player.current.playVideo();
  }
  if (event === "PAUSE") {
    eventToAvoid.current = 2;
    player.current.pauseVideo();
  }
}

export function recieveRoomDataEvent({ player, currentData, eventToAvoid }) {
  let videoId = player.current.playerInfo.videoData.video_id;
  if (currentData.newVideoId !== videoId) {
    loadVideoHandler({ player, currentData, eventToAvoid });
    if (currentData.state === 1) eventToAvoid.current = 1;
    if (currentData.state === 2) {
      eventToAvoid.current = 2;
      setTimeout(() => player.current.pauseVideo(), 1000);
    }
  } else {
    if (currentData.state === 1) {
      player.current.seekTo(Math.round(currentData.time) + 0.5, true);
      player.current.playVideo();
    }
    if (currentData.state === 2) {
      eventToAvoid.current = 2;
      setTimeout(() => player.current.pauseVideo(), 1000);
    }
  }
}
