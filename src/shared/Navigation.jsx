import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Navigation.module.css"




export default function Navigation() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/about" className={isActive => isActive ? `${styles["navLink"]} ${styles["active"]}` : `${styles["navLink"]}`} >
            About
          </NavLink>{" "}
        </li>
        {isAuthenticated ? (
          <>
            <li className={styles.navItem}>
              <NavLink
                to="/todos"
                className={isActive => isActive ? `${styles["navLink"]} ${styles["active"]}` : `${styles["navLink"]}`}
              >
                Todos
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/profile"
                className={isActive => isActive ? `${styles["navLink"]} ${styles["active"]}` : `${styles["navLink"]}`}
              >
                Profile
              </NavLink>{" "}
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <NavLink
                to="/login"
                className={isActive => isActive ? `${styles["navLink"]} ${styles["active"]}` : `${styles["navLink"]}`}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
