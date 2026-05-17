import TodoList from "./TodoList/TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";
import { useEffect } from "react";

export default function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [originalTodo, setOriginalTodo] = useState({})

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsTodoListLoading(true);
        const res = await fetch(`/api/tasks`, {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        });
        console.log(res);
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unathorized Error");
          }
          throw new Error("Error");
        }
        const resJson = await res.json();
        setTodoList(resJson.tasks);
      } catch (error) {
        setError(true);
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

      if(!res.ok){
        setTodoList(prevTodoList => prevTodoList.slice(1))
        throw new Error(res)
      }

      const resJson = await res.json();
      setTodoList(prevTodoList => [resJson, ...prevTodoList.slice(1)])
      
    } catch (error) {
      setTodoList(prevTodoList => prevTodoList.slice(1))
      return;
    }
  };
  console.log(todoList);

  const completeTodo = async(id) => {
    const originalTodo = [...todoList]
    const updatedTodos = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: true };
      }
      return item;
    });
    setTodoList(updatedTodos);
    console.log(originalTodo);    
    try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({isCompleted: true,}),
      headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
    })
    console.log(res);
    if(!res.ok) {
      throw new Error("Error cannot patch data")
    }

    const resJson = await res.json();
    console.log(resJson);
    } catch (error) {
      setTodoList(originalTodo)
      return;
    }
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
  );
}
