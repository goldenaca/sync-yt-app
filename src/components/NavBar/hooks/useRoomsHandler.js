import { useContext, useEffect, useRef, useState } from "react";
import { getYoutubeVideos } from "../../../api/getYoutubeVideos";
import { createRoomEvent, joinRoomEvent } from "../../../api/socketEvents";
import { PlayerContext } from "../../../contexts/PlayerProvider";
import { checkIfIsUrl, normalizedVideosInfo } from "../helpers/helpers";

export const useRoomsHandler = () => {
  const [joinRoomId, setJoinRoomId] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const [type, setType] = useState("");
  const joinInputRef = useRef();
  const { values, action } = useContext(PlayerContext);
  const { socket, roomId, searchResult, player, user } = values;

  function joinHandler(e) {
    e.preventDefault();
    if (joinRoomId.length !== 4) {
      setJoinRoomId("");
      return;
    }
    action.setRoomId(joinRoomId);
    setType("room");
    joinRoomEvent({ id: joinRoomId, socket, user });
  }

  function createHandler() {
    const newRoomId = Math.floor(1000 + Math.random() * 9000).toString();
    action.setRoomId(newRoomId);
    setType("room");
    createRoomEvent({ id: newRoomId, socket });
  }

  function leaveHandler() {
    window.location.reload();
  }

  const onSearchBarChange = async (e) => {
    const value = e.target.value;
    if (value === "") return action.setSearchResult([]);
    checkIfIsUrl({ value, setSearchBar, player, roomId, socket, user });
    const listVideos = await getYoutubeVideos(value);
    const normalizedListVideos = normalizedVideosInfo(listVideos);
    action.setSearchResult(normalizedListVideos);
  };

  useEffect(() => {
    if (searchResult[0] === "clearSearchInput") return setSearchBar("");
  }, [searchResult]);

  return {
    searchBar,
    onSearchBarChange,
    setSearchBar,
    leaveHandler,
    joinHandler,
    createHandler,
    joinInputRef,
    type,
    setType,
    joinRoomId,
    setJoinRoomId,
  };
};
