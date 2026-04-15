

export default function TodoListItem({todo}) {
  return (
    <li key={todo.id}>{todo.title}</li>
  )
}