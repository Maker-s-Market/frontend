import {useContext} from "react";
import {NotificationContext} from "../contexts/notification.jsx";

export const useNotification = () => useContext(NotificationContext)