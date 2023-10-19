export const Search = (props) => {


    const mockProducts = [{
        image: "https://picsum.photos/200",
        name: "Product #1",
        description: "If a dog chews shoes whose shoes does he choose?",
        categories: ["Food", "Love"],
        isNew: true
    }, {
        image: "https://picsum.photos/200",
        name: "Product #1",
        description: "If a dog chews shoes whose shoes does he choose?",
        categories: ["Food", "Love"],
        isNew: true
    }, {
        image: "https://picsum.photos/200",
        name: "Product #1",
        description: "If a dog chews shoes whose shoes does he choose?",
        categories: ["Food", "Love"],
        isNew: false
    }, {
        image: "https://picsum.photos/200",
        name: "Product #1",
        description: "If a dog chews shoes whose shoes does he choose?",
        categories: ["Food", "Love"],
        isNew: false
    }]


    return <div className="flex flex-col m-8 space-y-4">
        <h1 className={"text-4xl font-bold"}>Search Results</h1>
        {mockProducts.map((item, index) => {
            return <div key={index} className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={item.image} alt={item.name}/></figure>
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p>{item.description}</p>
                    <div className="card-actions justify-between items-center">
                        <div className={"space-x-2"}>
                            {item.categories.map((category, index) => {
                                return (<div key={index} className="badge badge-outline">{category}</div>)
                            })}
                        </div>
                        <button className="btn btn-primary">Buy Now!</button>
                    </div>
                </div>
            </div>
        })}
    </div>;
};