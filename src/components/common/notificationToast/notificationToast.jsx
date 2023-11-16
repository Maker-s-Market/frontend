import {useEffect} from "react";
import {useNotification} from "../../../hooks/useNotification.js";

export const NotificationToast = ({message, type, id}) => {
    const notification = useNotification()
    useEffect(() => {
        const timer = setTimeout(() => {
            notification.remove(id);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return <div className={`alert ${type}`}>
        <span>{message}</span>
    </div>
};