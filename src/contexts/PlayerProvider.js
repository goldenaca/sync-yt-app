import React, { createContext, useRef, useState } from "react";
import { useLoadPlayerAndSocket } from "./hooks/useLoadPlayerAndSocket";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState("New Astronaut");
  const [messagesList, setMessagesList] = useState([]);
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
