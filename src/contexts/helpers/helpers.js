import { sendChangeVideoEvent } from "../../api/socketEvents";

export function loadVideoHandler({ player, currentData, eventToAvoid }) {
  player.current.loadVideoById({
    videoId: currentData.newVideoId,
    startSeconds: currentData.time + 1,
  });
  eventToAvoid.current = 1;
}

export function loadLocalVideoHandler({
  player,
  roomId,
  socket,
  newVideoId,
  user,
}) {
  if (typeof player.current?.loadVideoById !== "function") return;
  const { currentTime } = player.current.playerInfo;
  player.current.loadVideoById(newVideoId);
  if (!roomId) return;
  sendChangeVideoEvent({ roomId, socket, newVideoId, currentTime, user });
}

export const createYTScript = () =>
  new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.append(tag);
    setTimeout(() => resolve(true), 1000);
  });
