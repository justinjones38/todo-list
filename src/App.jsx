import TodoList from './TodoList'
import TodoForm from './TodoForm'
import './App.css'

export default function App() {

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList />
    </div>
  )
}