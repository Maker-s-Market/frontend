import Router from './utils/Router'
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./contexts/auth.jsx";
import {NotificationProvider} from "./contexts/notification.jsx";
import {ReactQueryDevtools} from "react-query/devtools";
import {ShoppingProvider} from "./contexts/shopping.jsx";

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
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>)
}

export default App
