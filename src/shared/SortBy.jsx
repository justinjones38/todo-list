export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <div>
      <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
        <option value="createdAt">Creation Date</option>
        <option value="title">Title</option>
      </select>
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
