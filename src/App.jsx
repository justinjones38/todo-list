import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";
import "./App.css";

const todos = [
  {
    id: 1,
    title: "review resources",
  },
  {
    id: 2,
    title: "take notes",
  },
  {
    id: 3,
    title: "code out app",
  },
];

export default function App() {
  const [todoList, setTodoList] = useState(todos);
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}
