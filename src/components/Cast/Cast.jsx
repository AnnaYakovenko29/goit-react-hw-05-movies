import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../Api/Api';
import {List, Item, Img, Name, Charater} from './Cast.styled'

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCast(movieId)
      .then(response => setCast(response.data.cast))
      .catch(err => console.error(err.data));
  }, [movieId]);

  return (
      <List>
        {cast.map(({ cast_id, character, name, profile_path }) => (
          <Item key={cast_id}>
          <Img
            src={`https://image.tmdb.org/t/p/w200${profile_path}`}
            alt="profile"
          />
          <div>
          <Name>{name}</Name>
          <Charater>Charater:{character}</Charater>
          </div>
        </Item>
        )
        )}
      </List>
  );
}

