import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getImageURL } from "../utlis/image-utlis";
import Recommendations from "../components/Recommendations";
import { useFavorites } from "../context/FavoritesContext";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details.");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return (
      <div className="text-center p-6">
        <h1 className="text-xl font-bold text-red-500">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return <Loading />;

  const {
    volumeInfo: {
      title,
      authors,
      description,
      publisher,
      publishedDate,
      categories,
      imageLinks,
    } = {},
    saleInfo: { saleability, buyLink } = {},
  } = data;

  const book = {
    id,
    title,
    author: authors ? authors.join(", ") : "Unknown",
    thumbnail: imageLinks?.thumbnail || getImageURL("book.png"),
  };

  // Check if the book is already in favorites
  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id); // Remove from favorites
    } else {
      addFavorite(book); // Add to favorites
    }
  };

  return (
    <>
      <div className="details-container p-6 flex flex-col md:flex-row gap-6 bg-white shadow-md rounded-lg">
        <img
          src={book.thumbnail}
          alt={`${title || "Book"} Cover`}
          className="h-72 w-72 object-cover rounded-md"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{title || "Title Not Available"}</h1>
          <p className="text-sm text-gray-500">ID: {id}</p>
          <button
            className={`mt-4 px-4 py-2 rounded ${
              isFavorite
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          <hr className="border-t-2" />
          <p className="text-gray-700">
            {description || "No description available for this book."}
          </p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Details</h2>
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              <li>
                <strong>Author(s):</strong>{" "}
                {authors ? authors.join(", ") : "Unknown"}
              </li>
              <li>
                <strong>Publisher:</strong> {publisher || "Unknown"}
              </li>
              <li>
                <strong>Published Date:</strong> {publishedDate || "Unknown"}
              </li>
              <li>
                <strong>Categories:</strong>{" "}
                {categories ? categories.join(", ") : "None"}
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Sales Info</h2>
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              <li>
                <strong>Saleability:</strong> {saleability || "Not available"}
              </li>
              {buyLink && (
                <li>
                  <strong>Buy Link:</strong>{" "}
                  <a
                    href={buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Purchase Here
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Recommendations category={categories?.[0]} author={authors?.[0]} />
    </>
  );
};

export default Detail;
