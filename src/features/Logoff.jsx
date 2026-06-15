import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import styles from "./Logoff.module.css"

export default function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const prompt = window.confirm("Are you sure you want to logout");
    if(!prompt) {
      return;
    }
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
  return <button onClick={handleSubmit} className={styles.logoffBtn}>Log off</button>;
}
