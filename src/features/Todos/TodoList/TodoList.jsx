import { useMemo } from "react";
import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css"

export default function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
  statusFilter = "active",
}) {
  // const filteredTodoList = todoList.filter((item) => !item.isCompleted);
  const filteredTodoList = useMemo(() => {
    let filteredTodos;
    switch (statusFilter) {
      case "completed":
        filteredTodos = todoList.filter((todo) => todo.isCompleted);
        break;

      case "active":
        filteredTodos = todoList.filter((todo) => !todo.isCompleted);
        break;

      default:
        filteredTodos = [...todoList];
        break;
    }
    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [dataVersion, todoList, statusFilter]);

  const getEmptyMessage = () => {
    switch (statusFilter) {
      case "completed":
        return `No Completed todos yet. Complete some tasks to see them here`;
      case "active":
        return `No active todos. Add a todo above to get started`;
      default:
        return `Add todo above to get started`;
    }
  };
  return filteredTodoList.todos.length === 0 ? (
    <p className={styles.emptyMessage}>{getEmptyMessage()}</p>
  ) : (
    <div className={styles.container}>
      <h2 className={styles.title}>My todoList</h2>
      <ul className={styles.todoList}>
        {filteredTodoList.todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onCompleteTodo={onCompleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))}
      </ul>
    </div>
  );
}
