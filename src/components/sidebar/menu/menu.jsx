export const Menu = (props) => {
  return <div>
    {!props.isLoggedIn &&
      <li className="font-bold"><a>Sign In</a></li>
    }
    {props.isLoggedIn && <li className="font-bold">
      <a>Chat</a>
    </li>
    }
    <li className="font-bold"><a>Definições</a></li>
    {props.isLoggedIn &&
      <li className="font-bold"><a>Sign Out</a></li>
    }
  </div>
};