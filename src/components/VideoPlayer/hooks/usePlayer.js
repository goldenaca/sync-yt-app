import { useContext, useEffect, useRef } from "react";
import { sendCurrentInfoEvent } from "../../../api/socketEvents";
import { loadVideoHandler } from "../../../contexts/helpers/helpers";
import { PlayerContext } from "../../../contexts/PlayerProvider";
import { playerChannel } from "../../../utilites/constant";
import {
  avoidEventHandler,
  createPlayer,
  handleOnPlayerChange,
  recievePlayerEvent,
  recieveRoomDataEvent,
} from "../helpers/helpers";

export const usePlayer = () => {
  const playerContainer = useRef(null);
  const eventToAvoid = useRef(null);
  const { values } = useContext(PlayerContext);
  const {
    player,
    socket,
    roomId,
    searchResult,
    isPlayerAPILoaded,
    showChat,
    user,
  } = values;

  //    Create player component
  useEffect(() => {
    if (!isPlayerAPILoaded || player.current) return;
    createPlayer({ player, playerContainer });
  }, [isPlayerAPILoaded, player]);

  //    Create player listeneer
  useEffect(() => {
    if (!isPlayerAPILoaded || !roomId) return;
    const playerState = player.current;

    function onPlayerStateChange(event) {
      const shouldAvoid = avoidEventHandler({ event, eventToAvoid });
      if (shouldAvoid) return;
      handleOnPlayerChange({ event, socket, roomId, player, user });
    }

    playerState.addEventListener("onStateChange", onPlayerStateChange);
    return () => {
      playerState.removeEventListener("onStateChange", onPlayerStateChange);
    };
  }, [isPlayerAPILoaded, player, roomId, socket, user]);

  // Create socket listeneer
  useEffect(() => {
    if (!socket || !roomId) return;
    socket.on(playerChannel, ({ type, event, currentData }) => {
      if (type === "playerEvent") {
        recievePlayerEvent({ event, eventToAvoid, player, currentData });
      }

      if (type === "loadVideo") {
        loadVideoHandler({ player, currentData, eventToAvoid });
      }

      if (type === "askCurrentData") {
        sendCurrentInfoEvent({ socket, currentData, player });
      }

      if (type === "recieveCurrentRoomData") {
        recieveRoomDataEvent({ player, currentData, eventToAvoid });
      }
    });

    return () => socket.off(playerChannel);
  }, [player, roomId, socket]);

  return {
    showChat,
    searchResult,
    playerContainer,
  };
};
