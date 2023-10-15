import {useQuery} from "react-query";
import fetchTodos from "../../api/fetchTodos";

export const Home = (props) => {
    const {data, error, isLoading} = useQuery("todos", fetchTodos)
    return <div>
        <div className={"text-4xl text-white font-bold"}>Homepage</div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {data && <div>{JSON.stringify(data)}</div>}
    </div>


};