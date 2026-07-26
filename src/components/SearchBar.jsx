function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search players..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;