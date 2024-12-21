const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Allow requests from the frontend origin
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.get('/api/books', async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.VITE_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Google Books API Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || 'Failed to fetch books' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
