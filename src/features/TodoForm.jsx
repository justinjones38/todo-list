import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

export default function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const inputRef = useRef(null);

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (workingTodoTitle) {
      onAddTodo(workingTodoTitle);
      setWorkingTodoTitle("");
      inputRef.current.focus();
    }
  };
  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        ref={inputRef}
        value={workingTodoTitle}
      />
      <button type="submit" disabled={!workingTodoTitle.trim()}>
        Add Todo
      </button>
    </form>
  );
}
