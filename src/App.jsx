import Router from './utils/Router'
import {QueryClient, QueryClientProvider} from "react-query";

function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Router/>
        </QueryClientProvider>
    )
}

export default App
