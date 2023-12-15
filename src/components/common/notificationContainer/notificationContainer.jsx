import {NotificationToast} from "../notificationToast/index.js";
/**
 * `Loading` is a functional component that renders a loading spinner.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} A div element with a loading spinner.
 */
export const NotificationContainer = ({notifications}) => {
    return <div className="toast">
        {notifications.map((toast) => (
            <NotificationToast key={toast.id} {...toast} />
        ))}
    </div>
};