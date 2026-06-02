import { TODO_ACTIONS } from "../reducers/todoReducer";

export default function SortBy({
  sortBy,
  sortDirection,
  dispatch
}) {
  return (
    <div>
      <label htmlFor="sortBy">Sort By</label>
      <select value={sortBy} onChange={(e) => dispatch({type: TODO_ACTIONS.SET_SORT, payload: {newSortBy: e.target.value, newSortDirection: sortDirection}})} id="sortBy">
      {/* <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)} id="sortBy"> */}
        <option value="createdAt">Creation Date</option>
        <option value="title">Title</option>
      </select>
      <label htmlFor="sortDirection" id="sortDirection">Sort Direction</label>
      <select value={sortDirection} onChange={(e) => dispatch({type: TODO_ACTIONS.SET_SORT, payload: {newSortDirection: e.target.value, newSortBy: sortBy}})} id="sortDirection">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}
