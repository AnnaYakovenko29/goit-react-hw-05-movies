import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '0c8ed985db396a2fc86e7fa938a80edc',
  },
});

export const getTrending = async () => {
  const { data } = await instance.get('/trending/movie/day');
  return data;
};

export const searchMovies = async search => {
  const { data } = await instance.get('/search/movie', {
    params: { query: search },
  });
  return data;
};

export const getMovieById = async id => {
  const data = await instance.get(`/movie/${id}`);
  return data;
};
export const getMovieReviews = async id => {
  const data = await instance.get(`/movie/${id}/reviews`);
  return data;
};
export const getMovieCast = async id => {
  const data = await instance.get(`/movie/${id}/credits`);
  return data;
};
