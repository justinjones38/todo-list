export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <div>
      <label htmlFor="sortBy">Sort By</label>
      <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)} id="sortBy">
        <option value="createdAt">Creation Date</option>
        <option value="title">Title</option>
      </select>
      <label htmlFor="sortDirection" id="sortDirection">Sort Direction</label>
      <select
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value)}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}
