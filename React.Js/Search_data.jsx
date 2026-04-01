import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [search, setSearch] = useState("");
  const [All_data, setAll_data] = useState([]);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  //  Search Function
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/search/?search=${search}`
      );

      setAll_data(res.data.results); 
    } catch (error) {
      console.log(error);
    }
  };

  //  Add Data Function
  const handleAdd = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/search/", {
        Name: name,
        About: about,
      });

      alert("Data Added");
      setName("");
      setAbout("");
      handleSearch(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search API</h2>

      {/* Add Data */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="About"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>

      <hr />

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {/* Show Data */}
      <ul>
        {All_data.map((item) => (
          <li key={item.id}>
            <strong>{item.Name}</strong> - {item.About}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
