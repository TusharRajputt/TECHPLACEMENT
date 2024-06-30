import React from 'react';

const Quote = ({ text, author }) => (
  <div className="quote">
    <p>{text}</p>
    <p><strong>{author}</strong></p>
  </div>
);

export default Quote;
