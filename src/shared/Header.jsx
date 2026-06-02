import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const {token} = useAuth();
  return (
    <div>
      <h1>Todo List</h1>
    </div>
  )
}
