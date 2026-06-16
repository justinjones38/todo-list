import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import styles from "./Navigation.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import useWindowWidth from "../hooks/useWindowWidth";

export default function Navigation() {
  const { isAuthenticated } = useAuth();
  const windowWidth = useWindowWidth();
  const [isHamburgerMenuShown, setIsHamburgerMenuShown] = useState(false);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.hamburgerMenuContainer}>
        <RxHamburgerMenu
          onClick={() => setIsHamburgerMenuShown(true)}
          className={styles.hamburgerMenu}
        />
      </div>
      <div
        className={`${styles["menuContainer"]} ${isHamburgerMenuShown ? `${styles["active"]}` : ""}`}
      >
        <div className={styles.closeBtnContainer}>
          <IoMdClose
            onClick={() => setIsHamburgerMenuShown(false)}
            className={styles.closeBtn}
          />
        </div>
        <ul className={styles.navList}>
          <li
            className={styles.navItem}
            onClick={() => setIsHamburgerMenuShown(false)}
          >
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? `${styles["navLink"]} ${styles["active"]}`
                  : `${styles["navLink"]}`
              }
            >
              About
            </NavLink>{" "}
          </li>
          {isAuthenticated ? (
            <>
              <li className={styles.navItem}>
                <NavLink
                  to="/todos"
                  onClick={() => setIsHamburgerMenuShown(false)}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["navLink"]} ${styles["active"]}`
                      : `${styles["navLink"]}`
                  }
                >
                  Todos
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to="/profile"
                  onClick={() => setIsHamburgerMenuShown(false)}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["navLink"]} ${styles["active"]}`
                      : `${styles["navLink"]}`
                  }
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
                  onClick={() => setIsHamburgerMenuShown(false)}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["navLink"]} ${styles["active"]}`
                      : `${styles["navLink"]}`
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
