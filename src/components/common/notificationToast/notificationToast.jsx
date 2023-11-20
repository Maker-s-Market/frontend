import {useEffect} from "react";
import {useNotification} from "../../../hooks/useNotification.js";

export const notificationColorDict = {
    "info": "alert-info",
    "error" : "alert-error",
    "success" : "alert-success",
    "warning" : "alert-warning"
}
export const NotificationToast = ({message, type, id}) => {
    const notification = useNotification()
    useEffect(() => {
        const timer = setTimeout(() => {
            notification.remove(id);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    console.log(type)

    return <div className={`alert ${notificationColorDict[type]}`}>
        <span>{message}</span>
    </div>
};