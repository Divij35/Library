import axios from 'axios';

const BACKEND_URL = process.env.VITE_BACKEND_URL;

export const fetchBooks = async (query) => {
  const response = await axios.get(`${BACKEND_URL}/api/books?query=${query}`);
  return response.data.items || [];
};

export const fetchTrendingBooks = async () => {
  return fetchBooks("subject:fiction&orderBy=relevance&printType=books");
};