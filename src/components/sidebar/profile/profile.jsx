import {useAuth} from "../../../hooks/useAuth.js";

export const Profile = (props) => {
  const {isAuthenticated} = useAuth();
  return <div>

    {isAuthenticated && <div className="p-3 flex space-x-4">
      <div className="avatar ">
        <div className="w-24 rounded-full ">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="profile picture" />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-lg">Name LastName</h1>
        <h3 className="text-md">@username</h3>
        </div>
    </div>
    }
  </div>;
};