import React, { useState, useEffect, useContext } from 'react';
import '../styles/Items.css';
import Modal from './Modal';
import { SearchResultContext } from '../contexts/SearchResultContext';

const Items = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDescriptionItemId, setSelectedDescriptionItemId] = useState(null);
  const { searchResult } = useContext(SearchResultContext);

  useEffect(() => {
    fetch('/items')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.log('Data from server is not an array. Setting items to an empty array.');
          setItems([]);
        }
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  

  const handleImageClick = (e, item) => {
    e.stopPropagation();
    setSelectedItem(item);
  }

  const handleDescriptionClick = (itemId) => {
    if (selectedDescriptionItemId === itemId) {
      setSelectedDescriptionItemId(null); // collapse if clicking the expanded item
    } else {
      setSelectedDescriptionItemId(itemId);
    }
  }

  
  const itemsToDisplay  = searchResult !== null ? searchResult : items;

  return (
    <div className="items-container">
      {itemsToDisplay.length > 0 ? (
        itemsToDisplay.map(item => (
          <div key={item.id} className="item-card">
            <h2>{item.name}</h2> 
            <p>Price: {item.price}</p>
            <p>Stock Quantity: {item.stock}</p> 
            <p 
              className={selectedDescriptionItemId === item.id ? "long-description" : "short-description"} 
              onClick={() => handleDescriptionClick(item.id)}
            >
              Description: {item.description}
            </p>
            <p>Rating: {item.rating}</p>
            <p>Category: {item.categoryName}</p>  {/* Display the category name */}
            <img 
              src={item.img_url} 
              alt={item.name} 
              className="item-image" 
              onClick={(e) => handleImageClick(e, item)} 
            /> 
          </div>
        ))
      ) : (
        <p>No items found.</p>
      )}
      {selectedItem && 
        <Modal 
          selectedImage={selectedItem.img_url}
          description={selectedItem.description}
          setSelectedItem={setSelectedItem} 
        />
      }
    </div>
  );
};

export default Items;

