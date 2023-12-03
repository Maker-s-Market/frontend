import {useEffect} from "react";
import {useNotification} from "../../../hooks/useNotification.js";

export const NotificationToast = ({message, type, id}) => {

    const notificationColors = {
        "info": "alert-info",
        "error" : "alert-error",
        "success" : "alert-success",
        "warning" : "alert-warning"
    }


    const notification = useNotification()
    useEffect(() => {
        const timer = setTimeout(() => {
            notification.remove(id);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return <div className={`alert ${notificationColors[type]}`}>
        <span>{message}</span>
    </div>
};