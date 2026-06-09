import { useAuth } from "../contexts/AuthContext"
import {useLocation} from "react-router"
import {useState, useEffect} from "react";

export default function ProfilePage() {
  const userInfo = useLocation();
  const [todoStats, setTodoStats] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {token} = useAuth();
  useEffect(() => {
    const fetchTodoStats = async() => {
      if(!token) {
        return;
      }
      try {
        setLoading(true);
        setError("");
        const options = {
          method: "GET",
          headers: {"X-CSRF-TOKEN": token},
          credentials: "include",
        }
        const response = await fetch("api/tasks", options);
        if(response.status === 401) {
          throw new Error("Unauthorized");
        } 
        if(!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const todos = await response.json();

        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length
        console.log(total);

        const active = total - completed;
        setTodoStats({total, completed, active});
      } catch(err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false)
      }
    }
    fetchTodoStats()
  }, [token])
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Total Todos: {todoStats.total}</p>
      <p>Completed Todos: {todoStats.completed}</p>
      <p>Active Todos: {todoStats.active}</p>
    </div>
  )
}