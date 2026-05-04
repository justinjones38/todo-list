import TodoList from "./shared/TodoList";
import TodoForm from "./features/TodoForm";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const addTodo = (todoTitle) => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((prevTodoList) => [newTodo, ...prevTodoList]);
  };

  const completeTodo = (id) => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: true };
      }
      return item;
    });
    setTodoList(updatedTodos);
  };

  const updateTodo = (editedTodo) => {
    const updatedTodos = todoList.map(todo => {
      if(todo.id === editedTodo.id) {
        return {...editedTodo}
      }
      return todo
    })
    setTodoList(updatedTodos);
  } 

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
    </div>
  );
}
