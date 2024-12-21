import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageURL } from "../utlis/image-utlis";

const List = ({ books }) => {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
      {books.map((book) => (
        <div
          key={book.id}
          className="rounded-lg bg-white shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
          onClick={()=>handleNavigation(book.id)}
        >
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || getImageURL("book.png")}
            alt={book.volumeInfo.title}
            className="rounded-md transform group-hover:scale-105 duration-100 transition-transform size-32"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {book.volumeInfo.title}
          </h3>
          <p className="text-sm text-gray-600">
            {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default List;
