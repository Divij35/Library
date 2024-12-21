import React, { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import List from "../components/List";
import { fetchBooks } from "../Services/fetchBooks";
import TrendingBooks from "../components/TrendingBooks";

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
      <TrendingBooks/>
    </div>
  );
};

export default Home;
