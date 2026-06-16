import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <p className={styles.footerItem}>
        Justin's TodoList Project {"\u00a9"} {year}
      </p>
    </div>
  );
}
