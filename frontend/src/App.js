import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [thumbsUpCount, setThumbsUpCount] = useState(0);

  const fetchRandomQuote = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quote/random');
      const quoteData = response.data;

      // Cleaning author name if it contains ".typefit"
      let cleanedAuthor = quoteData.author || 'Unknown';
      cleanedAuthor = cleanedAuthor.split('.')[0].trim();

      setQuote(quoteData.text);
      setAuthor(cleanedAuthor);
      fetchComments(quoteData.text);
      setThumbsUpCount(0); // Reset thumbs up count
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  }, []);

  const fetchComments = async (quoteText) => {
    try {
      const response = await axios.get('http://localhost:5000/api/quote/comments', {
        params: { quote: quoteText }
      });
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/api/quote/comment', {
          quote,
          comment: newComment
        });
        setComments(response.data.comments);
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleThumbsUp = () => {
    setThumbsUpCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  return (
    <div className="App">
      <div className="background-animation"></div>
      <h1>Quote of the Day</h1>
      <div className="quote-container">
        <p className="quote">"{quote}"</p>
        <p className="author">- {author}</p>
        <button onClick={fetchRandomQuote} className="button">Next Quote</button>
        <div className="thumbs-up-container">
          <button className="thumbs-up" onClick={handleThumbsUp}>&#128077;</button>
          <span>{thumbsUpCount}</span>
        </div>
      </div>
      <div className="comments-section">
        <h2>Comments</h2>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={addComment} className="button">Add Comment</button>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

