import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
      className="search-bar flex relative m-2 flex-1"
    >
      <input
        type="text"
        placeholder="Search for eBooks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button className="absolute top-2 right-2 border-l-2 pl-1" type="submit">
        <MagnifyingGlassIcon className=" size-6" />
      </button>
    </form>
  );
};

export default SearchBar;
