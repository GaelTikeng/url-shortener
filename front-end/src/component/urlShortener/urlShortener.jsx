import React from "react";

import "./urlShortener.css";

export default function UrlShortener() {


  const handleClick = () => {
    
  } 


  return (
    <div className="main-container">
      <h1>URL Shortener Microservice</h1>
      <h2>Short URL Creation</h2>
      <p>Example: POST [project_url]/api/shorturl - https://www.google.com </p>
      <div className="big-box">
        <div className="small-box">
          <p>URL:</p>
          <input
            type="text"
            placeholder="https://www.freecodecamp.org"
            className="url"
          />
          <button
            className="btn"
            onClick={handleClick()}
          >
            POST URL
          </button>
        </div>
      </div>
      <h2>Example Usage:</h2>
    </div>
  );
}
