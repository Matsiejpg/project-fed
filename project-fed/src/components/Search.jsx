import styles from "./Search.module.css";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search Cryptocurrencies"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={styles.searchbar}
    />
  );
}

export default SearchBar;
