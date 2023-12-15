/**
 * notificationReducer is a reducer function for handling notification related actions.
 *
 * @param {Object} state - The current state of the application.
 * @param {Object} action - The action to be handled.
 * @returns {Object} The new state after applying the action.
 */
export const notificationReducer = (state,action) => {
    switch (action.type) {
        case "ADD_NOTIFICATION":
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        case "DELETE_NOTIFICATION":
            const updatedNotifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            );
            return {
                ...state,
                notifications: updatedNotifications,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};