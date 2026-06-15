import { TODO_ACTIONS } from "../reducers/todoReducer";
import styles from "./FilterInput.module.css"

export default function FilterInput({ filterTerm, dispatch }) {
  return (
    <div className={styles.container}>
      <label htmlFor="filterInput" className={styles.label}>Search todos</label>
      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        className={styles.input}
        onChange={(e) =>
          dispatch({
            type: TODO_ACTIONS.SET_FILTER,
            payload: { newFilterTerm: e.target.value },
          })
        }
        placeholder="Search by title"
      />
    </div>
  );
}
