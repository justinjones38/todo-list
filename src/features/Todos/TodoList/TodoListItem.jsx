import { useState } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";
import useEditableTitle from "../../../hooks/useEditableTitle";
import styles from "./TodoListItem.module.css";

export default function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title);
  console.log(todo);

  const handleCancel = () => {
    cancelEdit();
  };

  const handleEdit = (event) => {
    updateTitle(event.target.value);
  };

  const handleUpdate = (event) => {
    if (!isEditing) {
      return;
    }
    event.preventDefault();
    const finalTitle = finishEdit();
    onUpdateTodo({ ...todo, title: finalTitle });
  };

  return (
    <li>
      <form onSubmit={handleUpdate} className={styles.form}>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <div className={styles.btnContainer}>
              <button type="button" onClick={handleCancel} className={`${styles["btn"]} ${styles["cancelBtn"]}`}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={!isValidTodoTitle(workingTitle)}
                className={`${styles["btn"]} ${styles["updateBtn"]}`}
              >
                Update
              </button>
            </div>
          </>
        ) : (
          <div className={styles.todoItem}>
              <p className={styles.title}>{todo.title}</p>
              <div className={styles.todoBtnContainer}>
                  <button className={styles.editTodo} onClick={() => startEditing()}>Edit</button>
                  <button 
                    onClick={(e) => onCompleteTodo(todo.id, e)}
                    disabled={todo.isCompleted}
                    className={`${styles["todoBtn"]} ${todo.isCompleted ? `${styles["completed"]}` : `${styles["notCompleted"]}`}`}
                    >
                      {todo.isCompleted ? "completed" : "not completed"}
                  </button>
              </div>
          </div>
        )}
      </form>
    </li>
  );
}
