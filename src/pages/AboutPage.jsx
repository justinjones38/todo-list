import styles from "./AboutPage.module.css"

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>About page</h2>
      <p className={styles.description}>
        This todo site is a todo-page that allows you to add/remove items that
        you need to do.
      </p>
      <p className={styles.pageBuilt}>This page was built using:</p>
      <ul className={styles.listItems}>
        <li className={styles.listItem}>React</li>
        <li className={styles.listItem}>CSS</li>
        <li className={styles.listItem}>API fetching</li>
        <li className={styles.listItem}>React Router</li>
        <li className={styles.listItem}>Vite</li>
      </ul>
    </div>
  );
}
