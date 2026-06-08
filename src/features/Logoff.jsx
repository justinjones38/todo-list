import { useAuth } from "../contexts/AuthContext";
import {useNavigate} from "react-router"
export default function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const result = await logout();
      if (!result.success) {
        throw new Error(result.error);
      }
      navigate("/login");
    } catch (error) {
      return error.message;
    }
  };
  return <button onClick={handleSubmit}>Log off</button>;
}
