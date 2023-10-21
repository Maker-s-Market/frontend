import Router from './utils/Router'
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./contexts/auth.jsx";

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router/>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App
