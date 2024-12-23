const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: process.env.VITE_URI.replace(/\/$/, "")
};

app.use(cors(corsOptions));

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

if(process.env.NODE_ENV!=="production"){
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
}


module.exports = app;