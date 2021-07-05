import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./Request";
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  
  function truncate(str, max) {
    return (str.length > max ? str.substr(0, max-1) + '…' : str);
  }
  
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie.title || movie.name || movie?.original_name || "Loading....."}</h1>
        <div className="banner__butttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview || "lOADING",150)}</h1>
      </div>
      <div className="banner__fadebottom"></div>
    </header>
  );
};

export default Banner;
