import { chatChannel, playerChannel, roomsChannel } from "../utilites/constant";

export function sendChangeVideoEvent({ roomId, socket, newVideoId }) {
  if (!roomId) return;
  socket.emit(playerChannel, {
    type: "loadVideo",
    roomId,
    currentData: { newVideoId },
  });
}
export function sendCurrentInfoEvent({ socket, player, currentData }) {
  const info = {
    newSocketId: currentData.newSocketId,
    newVideoId: player.current.playerInfo.videoData.video_id,
    time: player.current.playerInfo.currentTime,
    state: player.current.getPlayerState(),
  };
  socket.emit(playerChannel, {
    type: "sendCurrentRoomInfo",
    currentData: info,
  });
}

export function sendPlayerEvent({ socket, roomId, currentTime, eventNum }) {
  const event = {
    1: "PLAY",
    2: "PAUSE",
  };
  socket.emit(playerChannel, {
    type: "playerEvent",
    event: event[eventNum],
    roomId,
    currentData: { time: currentTime },
  });
}

export function createRoomEvent({ id, socket }) {
  socket.emit(roomsChannel, { id, type: "new" });
}

export function joinRoomEvent({ id, socket }) {
  socket.emit(roomsChannel, { id, type: "join" });
}

export function sendMessageEvent({ socket, user, type, message }) {
  socket.emit(chatChannel, { type, user, message });
}
