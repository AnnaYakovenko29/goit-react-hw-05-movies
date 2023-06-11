import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getTrending } from '../../Api/Api';
import {  MovieItem } from './Home.styled';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrending()
      .then(response => setMovies(response.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {movies.map(({ id, title }) => (
        <MovieItem key={id}>
          <NavLink to={`movies/${id}`} state={{ from: location }}>
            {title}
          </NavLink>
        </MovieItem>
      ))}
    </>
  );
}
