import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";
import "./App.css";


export default function App() {
  const [todoList, setTodoList] = useState([]);
  const addTodo = (todoTitle) => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle
    }

    setTodoList(prevTodoList => [newTodo, ...prevTodoList])
  } 


  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}
