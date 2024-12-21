import React, { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import List from "../components/List";
import { fetchBooks } from "../Services/fetchBooks";

const Home = () => {
  const [books, setBooks] = useState([]);

  const handleSearch = async (query) => {
    const results = await fetchBooks(query);
    setBooks(results);
  };
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <List books={books} />
    </div>
  );
};

export default Home;
