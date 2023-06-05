import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './/ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { addImages } from './api';

import './styles.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      const { totalHits, hits } = await addImages(query, page);
      if (totalHits === 0) {
        toast.error('Nothing was found for your request');
        setLoading(false);
        return;
      }

      setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
      setTotalHits(prevTotalHits =>
        page === 1 ? totalHits - hits.length : prevTotalHits - hits.length
      );
      setLoading(false);
    };
    fetchData().catch(error => {
      toast.error(`Oops! Something went wrong! ${error}`);
      setLoading(false);
    });
  }, [page, query]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {images && <ImageGallery images={images} />}
      {!!totalHits && <Button onLoadMore={handleLoadMore} />}
      {loading && <Loader />}
      <ToastContainer autoClose={2000} />
    </>
  );
};

// export class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     totalHits: 0,
//     loading: false,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;

//     if (prevState.query !== query || prevState.page !== page) {
//       try {
//         this.setState({ loading: true });

//         const { totalHits, hits } = await addImages(query, page);

//         if (totalHits === 0) {
//           toast.error('Nothing was found for your request');
//           this.setState({ loading: false });
//           return;
//         }

//         this.setState(prevState => ({
//           images: page === 1 ? hits : [...prevState.images, ...hits],

//           totalHits:
//             page === 1
//               ? totalHits - hits.length
//               : totalHits - [...prevState.images, ...hits].length,
//         }));

//         this.setState({ loading: false });
//       } catch (error) {
//         toast.error(`Oops! Something went wrong! ${error}`);
//       }
//     }
//   }

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   handleFormSubmit = query => {
//     this.setState({ query, page: 1 });
//   };
//   render() {
//     const { images, totalHits, loading } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {images && <ImageGallery images={images} />}
//         {!!totalHits && <Button onLoadMore={this.handleLoadMore} />}
//         {loading && <Loader />}
//         <ToastContainer autoClose={2000} />
//       </>
//     );
//   }
// }
