import { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movielist from "./components/Movielist";
import Watchlist from "./components/Watchlist";
import Favourite from "./components/Favourite";
import Moviecard from "./components/Moviecard";

function App() {
  return (
    <>
      <Router>
        <div className="w-full z-50 bg-slate-800 shadow-md sm:sticky sm:top-0">
          <Navbar />
        </div>

        <div className="p-6 bg-neutral-300 min-h-screen">
          <Routes>
            <Route path="/" element={<Movielist />} />
            <Route path="/movie/:id" element={<Moviecard />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/favourite" element={<Favourite />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
