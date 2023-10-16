export const Highlights = (props) => {
    const mockProducts = [{
        image: "https://picsum.photos/400",
        name: "Product #1",
        description: "If a dog chews shoes whose shoes does he choose?",
        categories: ["Food", "Love"],
        isNew: true
    }, {
        image: "https://picsum.photos/400",
        name: "Product #1",
        description: "If a dog chews shoes whose shoes does he choose?",
        categories: ["Food", "Love"],
        isNew: true
    }, {
        image: "https://picsum.photos/400",
        name: "Product #1",
        description: "If a dog chews shoes whose shoes does he choose?",
        categories: ["Food", "Love"],
        isNew: false
    }, {
        image: "https://picsum.photos/400",
        name: "Product #1",
        description: "If a dog chews shoes whose shoes does he choose?",
        categories: ["Food", "Love"],
        isNew: false
    }]
    return <>
        <h1 className={"text-5xl font-bold text-center py-12"}>Highlighted Products</h1>
        <div
            className={"grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-4 gap-4 w-3/4 mx-auto"}>
            {mockProducts.map((item, index) => {
                return <div key={index} className="card bg-base-100 shadow-xl">
                    <figure><img src={item.image} alt="Shoes"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {item.name}
                            {item.isNew && <div className="badge badge-secondary">NEW</div>}
                        </h2>
                        <p>{item.description}</p>
                        <div className="card-actions justify-end">
                            {item.categories.map((category, index) => {
                                return (<div key={index} className="badge badge-outline">{category}</div>)
                            })}
                        </div>
                    </div>
                </div>
            })}
        </div>
    </>
};