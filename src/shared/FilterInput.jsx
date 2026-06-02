import { TODO_ACTIONS } from "../reducers/todoReducer";

export default function FilterInput({ filterTerm, dispatch }) {
  return (
    <div>
      <label htmlFor="filterInput">Search todos</label>
      <input
        id="filterInput"
        type="text"
        value={filterTerm}
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
