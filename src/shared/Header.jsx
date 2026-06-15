import { useAuth } from "../contexts/AuthContext";
import Logoff from "../features/Logoff";
import Navigation from "./Navigation";
import styles from "./Header.module.css";

export default function Header() {
  const { token, isAuthenticated } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Todo List</h1>
        <Navigation />
        {isAuthenticated ? <Logoff /> : null}
      </div>
    </div>
  );
}
