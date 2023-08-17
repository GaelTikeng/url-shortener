import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./urlShortener.css";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const navigate = useNavigate();
  // const [shortUrl, setShortUrl] = useState(0);

  const handleClick = () => {
    // e.preventDefault()
    let rawData = null;

    axios
      .post("http://localhost:3001/api/shorturl", {
        originalUrl,
      })
      .then((response) => {
        console.log("here is the response", response.data);
        rawData = response.data;
        localStorage.setItem("url-object", JSON.stringify(rawData));
        navigate('/api/shorturl');
      })
      .catch((error) => console.log("An error occured", error));
  };

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
            name="url"
            // value={url}
            placeholder="https://www.freecodecamp.org"
            className="url"
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button className="btn" onClick={handleClick}>
            POST URL
          </button>
        </div>
      </div>
      <h2>Example Usage:</h2>
    </div>
  );
}
