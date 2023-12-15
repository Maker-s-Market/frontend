import {useContext} from "react";
import {NotificationContext} from "../contexts/notification.jsx";
/**
 * useNotification is a custom hook that provides access to the NotificationContext.
 * @hook
 * @returns {Object} The NotificationContext.
 */
export const useNotification = () => useContext(NotificationContext)