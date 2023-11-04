import {useAuthContext} from "../../../contexts/auth.jsx";

export const Profile = (props) => {
  const {isLogged,user} = useAuthContext();
  return <div>

    {isLogged() && <div className="p-3 flex space-x-4">
      <div className="avatar ">
        <div className="w-24 rounded-full ">
          <img src={user.photo || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt="profile picture" />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-lg">{user.name}</h1>
        <h3 className="text-md">@{user.username}</h3>
        </div>
    </div>
    }
  </div>;
};