import { FaOtter } from "react-icons/fa";

export const Categories = (props) => {

  const mockCategories = [{
    title: "Comida", icon: ""
  },
  { title: "Azulejos", icon: "" },
  { title: "Jardinagem", icon: "" },
  { title: "Joelheria", icon: "" },
  { title: "Calçado", icon: "" },
  { title: "Literatura", icon: "" },
  { title: "Utensílios", icon: "" },
  { title: "Serviços", icon: "" }]

  return <div id="drawer-categories" className="overscroll-contain">
    <h1 className="text-start font-semibold">Categorias</h1>
    {mockCategories.map((object, index) => {
      return <li key={index} className="justify-center p-2">
        <a>
          <div className="rounded-full bg-gray-500 p-2">
            <FaOtter />
          </div>
          <h2 className="grow">{object.title}</h2>
        </a>
      </li>
    })}
  </div>

    ;
};