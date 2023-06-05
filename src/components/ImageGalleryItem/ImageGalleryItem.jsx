import  { useState } from 'react';
import Modal  from '../Modal/Modal';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {
const [showModal, setShowModal] = useState(false);

 const toggleModal = () => {
  setShowModal(prevState => !prevState);
  };

  return (
          <li className="gallery-item">
            <img
              src={webformatURL}
              alt={tags}
              onClick={toggleModal}
              className="gallery-item-img"
            />
    
            {showModal && (
              <Modal onClose={toggleModal}>
                <img 
                src={largeImageURL} 
                alt={tags}/>
              </Modal>
            )}
          </li>
        );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
