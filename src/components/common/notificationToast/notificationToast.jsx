import {useEffect} from "react";
import {useNotification} from "../../../hooks/useNotification.js";
/**
 * `NotificationToast` is a functional component that renders a single notification.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} A div element representing a single notification.
 */
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