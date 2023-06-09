import { useEffect, useState, useCallback } from 'react';
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { getMovieById } from '../Api/Api';
import {
  Container,
  Button,
  Img,
  Title,
  Wrapper,
  Text,
  PreTitle,
  Item,
  List,
} from './MovieDetails.styled';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const btnBack = useCallback(() => navigate(from), [from, navigate]);

  useEffect(() => {
    getMovieById(movieId)
      .then(response => setMovie(response.data))
      .catch(err => console.error(err.data));
  }, [movieId]);

  return (
    <>
      <Button type="button" onClick={btnBack}>
        Go back
      </Button>
      <Container>
      <Img
        src={`https://image.tmdb.org/t/p/w200/${movie?.poster_path}`}
        alt="poster"
      />
      <Wrapper>
        <Title>{movie?.title}</Title>
        <Text>User Score:{(movie?.vote_average * 10).toFixed(0)}%</Text>
        <PreTitle>Overview</PreTitle>
        <Text>{movie?.overview}</Text>
        <PreTitle>Genresv</PreTitle>
        <Text>
          {movie?.genres &&
            movie.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
        </Text>
      </Wrapper>
      </Container>
      <h3>Additional information</h3>
      <List>
        <Item>
          <Link
            to={`/movies/${movieId}/cast`}
            state={{ from: location.state.from }}
          >
            Cast
          </Link>
        </Item>
        <Item>
          <Link
            to={`/movies/${movieId}/reviews`}
            state={{ from: location.state.from }}
          >
            Reviews
          </Link>
        </Item>
      </List>
      <Outlet />
    </>
  );
}
