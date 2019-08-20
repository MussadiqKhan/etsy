import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import LoadMore from "react-loadmore-component";
import Listings from "./listings";

function App() {
  const API_KEY = "gzbfz3zz36yhy3xv4lqwxn5h";

  const [listings, setListings] = useState([]);

  const [offset, setOffset] = useState(0);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getListings();
  }, [query]);

  const axios = require("axios");

  async function getListings() {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    const response = await axios.get(
      `${proxy}https://openapi.etsy.com/v2/listings/active?api_key=${API_KEY}&keywords=${query}&fields=title,num_favorers,pagination,currency_code,url,price&limit=100&offset=${offset}&includes=MainImage,favorites`
    );
    console.log(response.data.pagination.next_offset);
    setOffset(response.data.pagination.next_offset);
    console.log(offset);

    if (offset >= 100) {
      console.log("hi");
      let Listings = response.data.results;
      Listings = Listings.concat(listings);
      const x = Listings.sort((a, b) => a.num_favorers - b.num_favorers);

      setListings(x);
      console.log(x);
    } else {
      const Listings = response.data.results;
      const x = Listings.sort((a, b) => a.num_favorers - b.num_favorers);
      setListings(x);
    }
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form className="search_form" onSubmit={getSearch}>
        <input
          type="text"
          className="search_input"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search_button">
          Submit
        </button>
      </form>

      <div className="recipes">
        {listings.map((recipe, i) => (
          <Listings
            key={"recipe_" + i}
            title={recipe.title}
            price={recipe.price}
            url={recipe.url}
            fav={recipe.num_favorers}
            image={recipe.MainImage.url_fullxfull}
            api=""
            //ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      <button onClick={getListings} type="button" className="load-more">
        Load more
      </button>
    </div>
  );
}

export default App;
