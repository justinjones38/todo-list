import {NavLink} from "react-router";
import { useAuth } from "../contexts/AuthContext";


const navLinkStyle = ({isActive}) => {
  return {
    textUnderline: "4px solid black",
    fontWeight: "700px"
  }
}

export default function Navigation() {
  const {isAuthenticated} = useAuth()
  return (
    <nav>
      <ul>
      <li><NavLink to="/about" style={({isActive}) => navLinkStyle(isActive)}>About</NavLink> </li>
        {isAuthenticated ? 
        <>
          <li><NavLink to="/todos" style={({isActive}) => navLinkStyle(isActive)}>Todos</NavLink></li>
          <li><NavLink to="/profile" style={({isActive}) => navLinkStyle(isActive)}>Profile</NavLink> </li>
        </> :
        <>
          <li><NavLink to="/login" style={({isActive}) => navLinkStyle(isActive)}>Login</NavLink></li>
        </>
      }
      </ul>
    </nav>
  )
}