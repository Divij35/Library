import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getImageURL } from "../utlis/image-utlis";
import { Link, useNavigate } from "react-router-dom";
import { fetchBooks } from "../Services/fetchBooks"

const Recommendations = ({ category, author }) => {
    const navigate = useNavigate();

    const handleNavigation=(id)=>{
        navigate(`/details/${id}`);
    }
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const queries = [];
        if (category) queries.push(`subject:${category}`);
        if (author) queries.push(`inauthor:${author}`);
        const query = queries.join("+");

        const response = await fetchBooks(query);
        setRecommendations(response)
        console.log(response)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [category, author]);


  if (loading) return <Loading />;
  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  if (recommendations.length === 0) {
    return <p className="text-gray-500 text-sm">No recommendations found.</p>;
  }

  return (
    <div className="m-8">
      <h2 className="text-xl font-semibold mb-4">Recommended Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((book) => {
          const { id, volumeInfo } = book;
          return (
            <div
              key={id}
              className="flex items-center gap-4 p-4 border rounded-md shadow-sm bg-white hover:shadow-md transition"
            >
              <img
                src={volumeInfo.imageLinks?.thumbnail || getImageURL("book.png")}
                alt={volumeInfo.title}
                className="h-20 w-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-medium">{volumeInfo.title}</h3>
                <p className="text-sm text-gray-500">
                  {volumeInfo.authors?.join(", ") || "Unknown Author"}
                </p>
                <Link
                  to={`/detail/${id}`}
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm underline"
                >
                  View More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;
