import TodoList from "./TodoList/TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";
import { useEffect } from "react";

export default function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchTodos = async () => {
      try {
        setIsTodoListLoading(true);
        const res = await fetch(`/api/tasks`, {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        });
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized Error");
          }
          throw new Error("Error");
        }
        const resJson = await res.json();
        setTodoList(resJson.tasks);
      } catch (error) {
        setError("Cannot fetch todo data");
      } finally {
        setIsTodoListLoading(false);
      }
    };
    fetchTodos();
  }, [token]);
  const addTodo = async (todoTitle) => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((prevTodoList) => [newTodo, ...prevTodoList]);

    try {
      const res = await fetch(`/api/tasks`, {
        method: "POST",
        body: JSON.stringify({
          title: newTodo.title,
          isCompleted: newTodo.isCompleted,
        }),
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(res);
      }

      const resJson = await res.json();
      setTodoList((prevTodoList) => [resJson, ...prevTodoList.slice(1)]);
    } catch (error) {
      setError("Cannot add todo");
      setTodoList((prevTodoList) => prevTodoList.slice(1));
    }
  };

  const completeTodo = async (id) => {
    const originalTodos = [...todoList];
    const updatedTodos = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: true };
      }
      return item;
    });
    setTodoList(updatedTodos);
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: true }),
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Error cannot patch data");
      }

      const resJson = await res.json();
    } catch (error) {
      setTodoList(originalTodos);
      setError("Cannot complete todo");
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodos = [...todoList];
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);
    try {
      const res = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Error cannot patch data");
      }

      const resJson = await res.json();
    } catch (error) {
      setTodoList(originalTodos);
      setError("Cannot update todo");
    }
  };
  return (
    <div>
      {error ? <h2>{error}</h2> : null}
      {isTodoListLoading ? <h2>Loading...</h2> : null}
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
      {error ? <button onClick={() => setError("")}>Clear Error</button> : null}
    </div>
  );
}
