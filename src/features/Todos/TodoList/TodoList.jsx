import TodoListItem from "./TodoListItem";

export default function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  console.log(todoList)
  const filteredTodoList = todoList.filter((item) => !item.isCompleted);
  return filteredTodoList.length === 0 ? (
    <p>Add todo above to get started</p>
  ) : (
    <ul>
      {filteredTodoList.map((todo) => (
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
