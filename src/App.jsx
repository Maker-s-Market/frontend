import Router from './utils/Router'
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./contexts/auth.jsx";
import {NotificationProvider} from "./contexts/notification.jsx";
import { library } from '@fortawesome/fontawesome-svg-core';
import {ShoppingProvider} from "./contexts/shopping.jsx";

import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab,fas);
function App() {
    const queryClient = new QueryClient()

    return (<QueryClientProvider client={queryClient}>
            <NotificationProvider>
                <AuthProvider>
                    <ShoppingProvider>
                        <Router/>
                    </ShoppingProvider>
                </AuthProvider>
            </NotificationProvider>
        </QueryClientProvider>)
}

export default App
