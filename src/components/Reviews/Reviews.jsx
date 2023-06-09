import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../Api/Api';
import { List, Author, Text } from './Reviews.styled';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieReviews(movieId)
      .then(response => setReviews(response.data.results))
      .catch(err => console.error(err.data));
  }, [movieId]);

  return (
    <List>
      {reviews.length > 0
        ? reviews.map(({ id, author, content }) => (
            <li key={id}>
              <Author>Author: {author}</Author>
              <Text>{content}</Text>
              <hr />
            </li>
          ))
        : `We do not have any reviews for this movie.`}
    </List>
  );
}
