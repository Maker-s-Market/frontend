import Router from './utils/Router'
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./contexts/auth.jsx";
import {NotificationProvider} from "./contexts/notification.jsx";

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <NotificationProvider>
                    <Router/>
                </NotificationProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App
