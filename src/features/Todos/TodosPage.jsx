import TodoList from "./TodoList/TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";

export default function TodosPage() {
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
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };
  return (
    <div>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  )
}