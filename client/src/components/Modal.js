import React from 'react';
import '../styles/Modal.css';

const Modal = ({ selectedImage, description, setSelectedItem }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedItem(null);
    }
  }

  return (
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedImage} alt='enlarged pic' />
      <p>{description}</p>
    </div>
  )
}

export default Modal;
