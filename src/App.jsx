import Router from './utils/Router'
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./contexts/auth.jsx";
import {NotificationProvider} from "./contexts/notification.jsx";
import { library } from '@fortawesome/fontawesome-svg-core';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab,fas);
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
