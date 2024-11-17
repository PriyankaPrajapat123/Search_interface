import React, { useState } from "react";
import SearchBar from "../searchbar/SearchBar";
import "./home.css";

function Home() {
  const [query, setQuery] = useState(""); // Track the query

  // Function to handle search
  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      return;
    }

  };

  return (
    <div className="searchBarContent1">
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
