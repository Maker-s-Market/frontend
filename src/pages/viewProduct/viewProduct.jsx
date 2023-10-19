  import { Profile } from "../../components/navbar/profile/profile";
import { FaMapMarkerAlt } from "react-icons/fa";
  import {Hero} from "../../components/home/hero/index.js";

export const ViewProduct = (props) => {

  const mockProduct = {
    title: "Product Title",
    image: "",
    categories: ["Food", "Love"],
    description: "Product description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 5.0
  }

  const mockSeller = {
    name: "Name LastName",
    location: "Aveiro"
  }

  return <div>
    <Hero/>
    <div className="flex flex-row m-8 space-x-4">
      <div id="item-info" className="space-y-2 p-5 grow-0 shrink-0 basis-3/4 grid bg-stone-200 rounded-lg">
        <h1 className="text-3xl font-bold">{mockProduct.title}</h1>


        <div className="justify-self-center m-3 w-80">
          <img src="https://picsum.photos/1048/720" alt={mockProduct.title} />
        </div>

        <div id="item-categories" className="flex flex-row space-x-2">
          {mockProduct.categories.map((item) => {
            return <div key={mockProduct.title} className="badge badge-secondary badge-outline">{item}</div>
          })}
        </div>


        <div className="inline-flex justify-between">
          <h3 className="text-lg font-bold">Descrição</h3>
          <div>
            <h3 className="text-lg font-bold">Classificação</h3>
          </div>
        </div>
        <p>{mockProduct.description}</p>
        <div className="divider"></div>
        <div id="item-stats-info" className="flex flex-row justify-between">
          <h4>ID: 999999</h4>
          <h4>Cliques: 999</h4>
          <h4 className="text-red-400 font-bold">Reportar</h4>
        </div>
        <div id="product-rating">

        </div>
      </div>
      <div id="seller-info" className="space-y-3 p-3">
        <div id="seller-specific" className="grid border-4 border-stone-500 rounded-lg p-3">
          <h3 className="text-lg font-bold">Vendedor</h3>
          <Profile isLoggedIn={true} />
          <button className="btn btn-neutral items-center">Enviar mensagem</button>
        </div>

        <div id="seller-rating" className="border-4 border-stone-500 rounded-lg p-3">
          <h3 className="text-lg font-bold">Localização</h3>
          <div className="inline-flex">
            <FaMapMarkerAlt />
            <h5 className="text-md">{mockSeller.location}</h5>
          </div>
        </div>
      </div>

    </div>
  </div>;
};