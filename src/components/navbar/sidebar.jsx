import { Profile } from "./profile/profile";
import { Menu } from "./menu/menu";
import {Categories} from "./categories/categories";

export const Sidebar = ({children}) => {

  const isLoggedIn = true;

  return <div className="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col justify-start">
      <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </label>
      {children}
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu p-5 w-80 space-y-3 min-h-full bg-base-200 text-base-content text-center">
        <div id="drawer-logo" className="flex justify-center">
          <img src="https://img.logoipsum.com/286.svg" alt="logo" />
        </div>
        <div className="divider"></div>
        
        <Profile isLoggedIn={isLoggedIn} />

        <Menu isLoggedIn={isLoggedIn}/>
        
        <div className="divider"></div>
        
        <Categories />

        <div className="divider"></div>
        <p className="text-start">Maker's Market © 2023</p>
      </ul>

    </div>
  </div>
};