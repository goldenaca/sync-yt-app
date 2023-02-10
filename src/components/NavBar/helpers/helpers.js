import { loadLocalVideoHandler } from "../../../contexts/helpers/helpers";

export const normalizedVideosInfo = (data) => {
  if (!data) return;
  const normalizedData = data.map((item) => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      videoImage: item.snippet.thumbnails.medium,
    };
  });
  return normalizedData;
};

export function checkIfIsUrl({
  value,
  setSearchBar,
  player,
  roomId,
  socket,
  user,
}) {
  if (value.includes("youtube.com/watch?v=")) {
    const urlLinkId = value.split("watch?v=")[1].split("&")[0];
    setTimeout(() => setSearchBar(""), 1000);
    loadLocalVideoHandler({
      player,
      roomId,
      socket,
      newVideoId: urlLinkId,
      user,
    });
  }

  if (value.includes("youtu.be/")) {
    const urlShareId = value.split("tu.be/")[1];
    setTimeout(() => setSearchBar(""), 1000);
    loadLocalVideoHandler({
      player,
      roomId,
      socket,
      newVideoId: urlShareId,
      user,
    });
  }
}
