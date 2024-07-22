import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit"
import { RootState } from "./store";

export type TWsActionTypes = {
  connect: ActionCreatorWithPayload<string>,
  disconnect: ActionCreatorWithoutPayload,
  sendMessage?: ActionCreatorWithPayload<any>,
  onConnecting: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<any>,
};

export const socketMiddlware = (
  wsActions: TWsActionTypes
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      sendMessage,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage
    } = wsActions;

    const { dispatch } = store;
    return (next) => (action) => {
      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        dispatch(onConnecting());

        socket.onopen = () => {
          dispatch(onOpen());
        }

        socket.onerror = () => {
          dispatch(onError('Error'));
        }

        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);
            dispatch(onMessage(parsedData));
          } catch (e) {
            dispatch(onError((e as { message: string }).message));
          }
        }

        socket.onclose = () => {
          dispatch(onClose());
        }
      }

      if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (e) {
          dispatch(onError((e as { message: string }).message));
        }
      }

      if (socket && disconnect.match(action)) {
        socket.close();
        socket = null;
      }

      next(action);
    }    
  };
};