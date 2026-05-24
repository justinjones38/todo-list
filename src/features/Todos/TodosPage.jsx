import TodoList from "./TodoList/TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";
import { useEffect } from "react";
import useDebounce from "../../utils/useDebounce";
import SortBy from "../../shared/SortBy";
import FilterInput from "../../shared/FilterInput";
import { useCallback } from "react";

export default function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterTerm, setFilterTerm] = useState("");
  const debouncedFilterTerm = useDebounce(filterTerm, 300);
  const [dataVersion, setDataVersion] = useState(0);
  const [filterError, setFilterError] = useState("");

  const handleFilterChange = (newTerm) => {
    setFilterTerm(newTerm);
  };

  const invalidateCache = useCallback(() => {
    setDataVersion((prev) => prev + 1);
  }, []);

  const resetFilterError = () => {
    setFilterTerm("");
    setSortBy("createdAt");
    setSortDirection("desc");
    setFilterError("");
  };

  const paramsObject = {
    sortBy,
    sortDirection,
  };

  if (debouncedFilterTerm) {
    paramsObject.find = debouncedFilterTerm;
  }
  const params = new URLSearchParams(paramsObject);

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchTodos = async () => {
      try {
        setIsTodoListLoading(true);
        const res = await fetch(`/api/tasks?total=100&${params}`, {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        });
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error(res);
          }
          throw new Error(res);
        }
        const resJson = await res.json();
        setTodoList(resJson.tasks);
        setFilterError("");
      } catch (error) {
        if (
          debouncedFilterTerm ||
          sortBy !== "createdAt" ||
          sortDirection !== "desc"
        ) {
          setFilterError(`Error filtering/sorting todos: ${error.message}`);
        } else {
          setError(`Error fetching todos: ${error.message}`);
        }
      } finally {
        setIsTodoListLoading(false);
      }
    };
    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);
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
      invalidateCache();
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
      invalidateCache();
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
      invalidateCache();
    } catch (error) {
      setTodoList(originalTodos);
      setError("Cannot update todo");
    }
  };
  return (
    <div>
      {error ? <h2>{error}</h2> : null}
      {isTodoListLoading ? <h2>Loading...</h2> : null}
      <SortBy
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortDirection={sortDirection}
        onSortDirectionChange={setSortDirection}
      />
      <FilterInput filterTerm={filterTerm} onFilterChange={setFilterTerm} />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
      {error ? <button onClick={() => setError("")}>Clear Error</button> : null}
      {filterError ? (
        <div>
          <p>{filterError}</p>
          <button onClick={(e) => setFilterError("")}>
            Clear Filter Error
          </button>
          <button onClick={resetFilterError}>Reset Filters</button>
        </div>
      ) : null}
    </div>
  );
}
