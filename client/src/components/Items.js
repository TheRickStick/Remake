import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Make sure to import axios
import '../styles/Items.css';
import Modal from './Modal';
import { SearchResultContext } from '../contexts/SearchResultContext';
import AuthContext from '../contexts/AuthContext';


const Items = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDescriptionItemId, setSelectedDescriptionItemId] = useState(null);
  const { searchResult, setSearchResult } = useContext(SearchResultContext);
  const { user } = useContext(AuthContext); // Get the logged-in user's info

  useEffect(() => {
    fetch('/items')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (Array.isArray(data)) {
          setItems(data);
          setSearchResult(data);
        } else {
          console.log('Data from server is not an array. Setting items to an empty array.');
          setItems([]);
        }
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);


  const handleAddToCart = async (itemId) => {
    if (!user) {
      alert('You must be logged in to add items to the cart');
      return;
    }
  
    const quantity = prompt('How many do you want to add to the cart?', '1');
  
    if (quantity === null) {
      // The user cancelled the prompt.
      return;
    }
  
    try {
      const token = localStorage.getItem('authToken');
      console.log("Sending request with itemId:", itemId, ", quantity:", quantity, "and token:", token);
      const response = await axios.post('http://localhost:3000/cart_item', { itemId, quantity: parseInt(quantity, 10) }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Response data:", response.data);
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error);
      alert('There was an error adding the item to your cart.');
    }
  };
  

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
            <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button> 
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
