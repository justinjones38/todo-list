import { useRef, useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";
import { sanitizeInput } from "../../utils/sanitizeInput";
import Logoff from "../Logoff";
import styles from "./TodoForm.module.css";

export default function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const inputRef = useRef(null);

  const handleAddTodo = (event) => {
    event.preventDefault();
    setWorkingTodoTitle((prev) => sanitizeInput(prev));
    if (workingTodoTitle) {
      onAddTodo(workingTodoTitle);
      setWorkingTodoTitle("");
      inputRef.current.focus();
    }
  };
  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <div className={styles.formElements}>
        <TextInputWithLabel
          elementId="todoTitle"
          labelText="Todo"
          onChange={(e) => setWorkingTodoTitle(e.target.value)}
          ref={inputRef}
          value={workingTodoTitle}
        />
        <button
          type="submit"
          className={styles.btn}
          disabled={!isValidTodoTitle(workingTodoTitle)}
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}
