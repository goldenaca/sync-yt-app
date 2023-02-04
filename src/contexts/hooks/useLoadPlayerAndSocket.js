import { useEffect, useState } from "react";
import { socketConnect } from "../../api/socketConnect";
import { createYTScript } from "../helpers/helpers";

export const useLoadPlayerAndSocket = () => {
  const [loadYoutubeApi, setLoadYoutubeApi] = useState(false);
  const [mySocket, setMySocket] = useState({});

  async function initialLoad() {
    await createYTScript();
    const socket = await socketConnect();
    setMySocket(socket);
    setLoadYoutubeApi(true);
  }

  useEffect(() => {
    initialLoad();
  }, []);

  return {
    socket: mySocket,
    isPlayerAPILoaded: loadYoutubeApi,
  };
};
