export const TopCategories = (props) => {

    const mockCategories = [{
        name: "Test", image: "https://picsum.photos/200"
    }, {
        name: "Test", image: "https://picsum.photos/200"
    }, {
        name: "Test", image: "https://picsum.photos/200"
    }, {
        name: "Test", image: "https://picsum.photos/200"
    }]
    return <>
        <h1 className={"text-5xl font-bold text-center py-12"}>Top Categories</h1>
        <div className={"grid grid-cols-2  lg:grid-cols-4 place-items-center gap-y-4 md:mx-auto md:w-3/4"}>
            {mockCategories.map((item, index) => {
                return (<div key={index} className={"w-full md:w-48 flex flex-col place-items-center space-y-4"}>
                        <div className="avatar">
                            <div className="w-40 rounded-full">
                                <img src={item.image} alt={"Temp"}/>
                            </div>
                        </div>
                        <p className={"text-3xl font-semibold"}>{item.name}</p>
                    </div>)
            })}
        </div>
    </>
};