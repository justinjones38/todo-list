import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import styles from "./Navigation.module.css"
import { RxHamburgerMenu } from "react-icons/rx";
import useWindowWidth from "../hooks/useWindowWidth";


export default function Navigation() {
  const { isAuthenticated } = useAuth();
  const windowWidth = useWindowWidth();
  const [isHamburgerMenuShown, setIsHamburgerMenuShown] = useState(true);
  return (
    <nav className={styles.navContainer}>
      {isHamburgerMenuShown ? 
      <div className={styles.hamburgerMenu} onClick={() => setIsHamburgerMenuShown(false)}>
        <RxHamburgerMenu />
      </div>
      :
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
      </ul>}
    </nav>
  );
}
