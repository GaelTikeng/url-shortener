import React from "react";
import UrlShortener from "./component/urlShortener/urlShortener";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShowUrl from "./component/showUrl/showUrl";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UrlShortener />}></Route>
        <Route path="/api/shorturl" element={<ShowUrl/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
