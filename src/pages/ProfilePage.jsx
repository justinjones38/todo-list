import { useAuth } from "../contexts/AuthContext"
import {useLocation} from "react-router"

export default function ProfilePage() {
  const userInfo = useLocation();
  console.log(userInfo);
  return (
    <h1>Profile Page</h1>
  )
}