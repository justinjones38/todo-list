import TodoList from "./TodoList/TodoList";
import TodoForm from "./TodoForm";
import { useState, useEffect, useCallback, useReducer } from "react";
import useDebounce from "../../utils/useDebounce";
import SortBy from "../../shared/SortBy";
import FilterInput from "../../shared/FilterInput";
import { initialTodoState, todoReducer, TODO_ACTIONS } from "../../reducers/todoReducer";


export default function TodosPage({ token }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState)

  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion
  } = state;


  const debouncedFilterTerm = useDebounce(filterTerm, 300);


  const paramsObject = {
    sortBy,
    sortDirection,
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchTodos = async () => {
      try {
        dispatch({type: TODO_ACTIONS.FETCH_START});
        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }
        const params = new URLSearchParams(paramsObject);
        const res = await fetch(`/api/tasks?${params}`, {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        });
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Cannot find data");
          }
          throw new Error("Data not fetched");
        }
        const resJson = await res.json();
        dispatch({type: TODO_ACTIONS.FETCH_SUCCESS, payload: {todoList: resJson.tasks}});
      } catch (error) {
        // Need to fix this
        if (
          debouncedFilterTerm ||
          sortBy !== "createdAt" ||
          sortDirection !== "desc"
        ) {
          setFilterError(`Error filtering/sorting todos: ${error.message}`);
        } else {
          setError(`Error fetching todos: ${error.message}`);
        }
      }
    };

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);


  const addTodo = async (todoTitle) => {
    const originalTodos = todoList;
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    dispatch({type: TODO_ACTIONS.ADD_TODO_START, payload: {newTodo}})

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

      dispatch({type: TODO_ACTIONS.ADD_TODO_SUCCESS, payload: {newTodo: resJson, originalTodos}});
    } catch (error) {
      dispatch({type: TODO_ACTIONS.ADD_TODO_ERROR, payload: {originalTodos, error: "Cannot add todo"}});
    }
  };

  const completeTodo = async (id) => {
    const originalTodos = [...todoList];
    const updatedTodos = todoList.map((item) => {
      if (item.id === id) {
        console.log(item);
        return { ...item, isCompleted: true };
      }
      return item;
    });
    dispatch({type: TODO_ACTIONS.COMPLETE_TODO_START, payload: {updatedTodos}})
    console.log(id);
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: true }),
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        credentials: "include",
      });
      console.log(todoList);
      console.log(res);
      if (!res.ok) {
        throw new Error("Error cannot patch data");
      }

      dispatch({type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS})
    } catch (error) {
      dispatch({type: TODO_ACTIONS.COMPLETE_TODO_ERROR, payload: {originalTodos, error: "Cannot complete todo"}})
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
    dispatch({type: TODO_ACTIONS.UPDATE_TODO_START, payload: {updatedTodos}})
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
      dispatch({type: TODO_ACTIONS.UPDATE_TODO_SUCCESS, payload: {updatedTodos}})
    } catch (error) {
      dispatch({type: TODO_ACTIONS.UPDATE_TODO_ERROR, payload: {originalTodos, error: "Cannot update todo"}})
    }
  };
  return (
    <div>
      {error ? <h2>{error}</h2> : null}
      {isTodoListLoading ? <h2>Loading...</h2> : null}
      <SortBy
        sortBy={sortBy}
        dispatch={dispatch}
        sortDirection={sortDirection}
      />
      <FilterInput filterTerm={filterTerm} dispatch={dispatch} />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
      {error ? <button onClick={() => dispatch({type: TODO_ACTIONS.CLEAR_ERROR})}>Clear Error</button> : null}
      {filterError ? (
        <div>
          <p>{filterError}</p>
          <button onClick={(e) => setFilterError("")}>
            Clear Filter Error
          </button>
          <button onClick={() => dispatch({type: TODO_ACTIONS.RESET_FILTERS})}>Reset Filters</button>
        </div>
      ) : null}
    </div>
  );
}
