import {Hero} from "../../components/home/hero/index.js";
import {useQuery} from "react-query";
import {fetchBuyerStats, fetchSellerStats} from "../../api/fetchStats.js";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useAuthContext} from "../../contexts/auth.jsx";
import {Loading} from "../../components/common/loading/index.js";

export const Stats = (props) => {
    const {token} = useAuthContext();

    const {
        data: dataBuyer, isSuccess: isSuccessBuyer, isLoading: isLoadingBuyer
    } = useQuery("buyer-stats", () => fetchBuyerStats(token))

    const {
        data: dataSeller, isSuccess: isSuccessSeller, isLoading: isLoadingSeller
    } = useQuery("seller-stats", () => fetchSellerStats(token))

    return <div>
        <Hero/>
        <div className="flex flex-col m-8 gap-4">
            <div id="item-info" className="col-span-4 bg-stone-200 rounded-lg p-4">
                <h1 className="text-4xl font-bold">Stats</h1>
            </div>

            {isLoadingBuyer && <Loading/>}
            {isSuccessBuyer && <div className="stats shadow">
                {dataBuyer.statistics.map((stat) => {
                        return <div className="stat place-items-center" key={stat.id}>
                            <div className="stat-title">{stat.name}</div>
                            <div className="stat-value">{stat.value === "" ? 0 : stat.value}</div>
                        </div>
                    }
                )}
            </div>}

            {isLoadingSeller && <Loading/>}
            {isSuccessSeller && <>
                <div className="stats shadow">
                    {dataSeller.statistics.map((stat) => {
                        return <div className="stat place-items-center" key={stat.id}>
                            <div className="stat-title">{stat.name}</div>
                            <div className="stat-value">{stat.value === "" ? 0 : stat.value}</div>
                        </div>
                    })}
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        width={500}
                        height={300}
                        data={dataSeller.chart}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="name" scale="point" padding={{left: 10, right: 10}}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Bar dataKey="value" fill="#d59b6c" background={{fill: '#eee'}}/>
                    </BarChart>
                </ResponsiveContainer>
            </>}
        </div>
    </div>
        ;
};