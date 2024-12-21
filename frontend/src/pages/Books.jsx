import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

const Books = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p className="text-gray-500 m-2">No favorite books added yet.</p>;
  }

  return (
    <div className="m-8">
      <h2 className="text-xl font-semibold mb-4">Favorite Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((book) => (
          <div
            key={book.id}
            className="flex items-center gap-4 p-4 border rounded-md shadow-sm bg-white hover:shadow-md transition"
          >
            <img
              src={book.thumbnail}
              alt={book.title}
              className="h-20 w-20 object-cover rounded-md"
            />
            <div>
              <h3 className="text-lg font-medium">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
              <Link
                to={`/detail/${book.id}`}
                className="text-blue-500 text-sm underline"
              >
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
