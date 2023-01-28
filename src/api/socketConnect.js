import { io } from "socket.io-client";
const { REACT_APP_SOCKET_URL_PROD, REACT_APP_SOCKET_URL_LOCAL } = process.env;

export const socketConnect = async () => {
  const socketServerUrl = window.location.href.includes("localhost")
    ? REACT_APP_SOCKET_URL_LOCAL
    : REACT_APP_SOCKET_URL_PROD;

  const socket = await io.connect(socketServerUrl, {
    transports: ["websocket"],
  });

  return socket;
};
