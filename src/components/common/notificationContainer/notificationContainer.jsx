import {NotificationToast} from "../notificationToast/index.js";

export const NotificationContainer = ({notifications}) => {
    return <div className="toast">
        {notifications.map((toast) => (
            <NotificationToast key={toast.id} {...toast} />
        ))}
    </div>
};