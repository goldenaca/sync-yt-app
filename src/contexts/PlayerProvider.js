import React, { createContext, useRef, useState } from "react";
import { useLoadPlayerAndSocket } from "./hooks/useLoadPlayerAndSocket";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState("New Astronaut");
  const [messagesList, setMessagesList] = useState([
    {
      messageType: "external",
      messageContent: "Hola Juanca, como estas. Que vemos hoy ?",
      messageOwner: "Pedro",
    },
    {
      messageType: "internal",
      messageContent: "Buenas Pedro, hoy vemos Jojos",
      messageOwner: "Juanca",
    },
    {
      messageType: "event",
      messageContent: "selected a video",
      messageOwner: "Juanca",
    },
    {
      messageType: "external",
      messageContent:
        "Mucho texto pero vengo a contar cosas para ver como se veria un mensaje largo y tambien es re loco como las cosas son locas y cambian de todo para la ixuqierda y juan carlos menem era terrible peda sopeda como pega papel con tijera altara rima de terrible flow cardo de juan carlo ",
      messageOwner: "Pedro",
    },
  ]);
  const [searchResult, setSearchResult] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const player = useRef(null);
  const { isPlayerAPILoaded, socket } = useLoadPlayerAndSocket();

  return (
    <PlayerContext.Provider
      value={{
        values: {
          roomId,
          searchResult,
          isPlayerAPILoaded,
          showChat,
          socket,
          player,
          messagesList,
          user,
        },
        action: {
          setShowChat,
          setSearchResult,
          setRoomId,
          setMessagesList,
          setUser,
        },
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
