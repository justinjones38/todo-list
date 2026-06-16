import { TODO_ACTIONS } from "../reducers/todoReducer";
import styles from "./SortBy.module.css";

export default function SortBy({ sortBy, sortDirection, dispatch }) {
  return (
    <>
      <div className={styles.sortItem}>
        <label htmlFor="sortBy">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) =>
            dispatch({
              type: TODO_ACTIONS.SET_SORT,
              payload: {
                newSortBy: e.target.value,
                newSortDirection: sortDirection,
              },
            })
          }
          id="sortBy"
        >
          <option value="createdAt">Creation Date</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className={styles.sortItem}>
        <label htmlFor="sortDirection">Sort Direction</label>
        <select
          value={sortDirection}
          onChange={(e) =>
            dispatch({
              type: TODO_ACTIONS.SET_SORT,
              payload: { newSortDirection: e.target.value, newSortBy: sortBy },
            })
          }
          id="sortDirection"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </>
  );
}
