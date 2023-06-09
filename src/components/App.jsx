import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import Layout from './Layout/Layout';
const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <div>
      <Suspense fallback={<p>...Loading</p>}>
      <Routes>
        <Route path='/' element={<Layout />}> 
        <Route index element={<Home/>}></Route>
        <Route path='/movies' element={<Movies/>}></Route>
        <Route path='/movies/:movieId' element={<MovieDetails/>}>
          <Route path='cast' element={<Cast/>}></Route>
          <Route path='reviews' element={<Reviews/>}></Route>
        </Route>
        {/* <Route path='*' element={<Home/>}></Route> */}
        </Route>
      </Routes>
      </Suspense>
    </div>
  );
};
