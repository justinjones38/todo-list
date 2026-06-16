import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const userInfo = useLocation();
  const [todoStats, setTodoStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { email, token } = useAuth();
  useEffect(() => {
    const fetchTodoStats = async () => {
      if (!token) {
        return;
      }
      try {
        setLoading(true);
        setError("");
        const options = {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };
        const response = await fetch("/api/tasks?limit=100", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const resJson = await response.json();
        const todos = resJson.tasks;
        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;

        const active = total - completed;
        setTodoStats({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTodoStats();
  }, [token]);
  return (
    <div className={styles.container}>
      {loading ? <h2>Loading...</h2> : null}
      {error ? (
        <p className={styles.errorText}>
          Server failure: cannot fetch profile stats. Please try again later
        </p>
      ) : null}
      {!loading && !error && todoStats ? (
        <>
          <h2 className={styles.title}>{email}'s profile page</h2>
          <p className={styles.stats}>
            Total Todos: <span>{todoStats.total}</span>
          </p>
          <p className={styles.stats}>
            Completed Todos: <span>{todoStats.completed}</span>
          </p>
          <p className={styles.stats}>
            Active Todos: <span>{todoStats.active}</span>
          </p>
          <p className={styles.dataStats}>
            You have completed{" "}
            {Math.round((todoStats.completed / todoStats.total) * 100)}% of
            todos
          </p>
        </>
      ) : null}
    </div>
  );
}
