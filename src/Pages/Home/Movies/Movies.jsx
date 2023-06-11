import { useEffect, useState } from 'react';
import { useSearchParams, NavLink, useLocation } from 'react-router-dom';
import { searchMovies } from '../../../Api/Api';
import { Form, Input, Button, MovieItem } from './Movies.styled';

export default function Movies() {
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();

  useEffect(() => {
    if (query === '' || query === null) {
      return;
    }
    searchMovies(query)
      .then(response => setMovies(response.results))
      .catch(err => console.error(err));
  }, [query]);

  const searchHandler = e => {
    e.preventDefault();
    if (e.target.search.value === '') {
      return;
    }
    setSearchParams({ query: e.target.search.value });

    e.target.reset();
  };

  return (
    <>
      <Form onSubmit={searchHandler}>
        <Input type="text" name="search" />
        <Button type="submit">Search</Button>
      </Form>
      <ul>
        {movies &&
          movies.map(({ id, title }) => (
            <MovieItem key={id}>
              <NavLink to={`/movies/${id}`} state={{ from: location }}>
                {title}
              </NavLink>
            </MovieItem>
          ))}
      </ul>
    </>
  );
}
