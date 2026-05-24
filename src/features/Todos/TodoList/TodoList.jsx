import { useMemo } from "react";
import TodoListItem from "./TodoListItem";

export default function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
}) {
  // const filteredTodoList = todoList.filter((item) => !item.isCompleted);
  const filteredTodoList = useMemo(() => {
    return {
      version: dataVersion,
      todos: todoList.filter((item) => !item.isCompleted),
    };
  }, [dataVersion, todoList]);
  return filteredTodoList.length === 0 ? (
    <p>Add todo above to get started</p>
  ) : (
    <ul>
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}
