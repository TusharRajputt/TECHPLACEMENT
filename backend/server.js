const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let quotesComments = {};

app.get('/api/quote/random', async (req, res) => {
  try {
    const response = await axios.get('https://type.fit/api/quotes');
    const quotes = response.data;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(randomQuote);
  } catch (error) {
    console.error('Error fetching random quote:', error.message);
    res.status(500).json({ error: 'Error fetching random quote' });
  }
});

app.post('/api/quote/comment', (req, res) => {
  const { quote, comment } = req.body;
  if (!quotesComments[quote]) {
    quotesComments[quote] = [];
  }
  quotesComments[quote].push(comment);
  res.json({ comments: quotesComments[quote] });
});

app.get('/api/quote/comments', (req, res) => {
  const { quote } = req.query;
  res.json({ comments: quotesComments[quote] || [] });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
 