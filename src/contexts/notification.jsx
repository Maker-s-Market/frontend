import {createContext, useReducer} from "react";
import {notificationReducer} from "../reducers/notificationReducer.js";
import {NotificationContainer} from "../components/common/notificationContainer/index.js";
/**
 * @file This file contains the NotificationContext and NotificationProvider components.
 */

/**
 * NotificationProvider component provides the notification context to its children.
 *
 * @component
 * @param {Object} props - The properties passed to the component, including children components.
 * @returns {JSX.Element} NotificationContext.Provider wrapping the children components.
 */
export const NotificationContext = createContext(null);

const initialState = {
  notifications: []
}
export const NotificationProvider = ({ children }) => {

  const [state, dispatch] = useReducer(notificationReducer,initialState)

  const addNotification = (type, message) => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: "ADD_NOTIFICATION", payload: { id, message, type } });
  };

  const success = (message) => {
    addNotification("success", message);
  };

  const accent = (message) => {
    addNotification("accent", message);
  };

  const info = (message) => {
    addNotification("info", message);
  };

  const error = (message) => {
    addNotification("error", message);
  };

  const remove = (id) => {
    dispatch({ type: "DELETE_NOTIFICATION", payload: id });
  };

  const ctx = {success, accent,info,error,remove}
  return (
      <NotificationContext.Provider value={ctx}>
        {children}
        <NotificationContainer notifications={state.notifications}/>
      </NotificationContext.Provider>
  );
};