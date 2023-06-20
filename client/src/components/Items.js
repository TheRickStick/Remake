import React, { useState, useEffect } from 'react';
import '../styles/Items.css';

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/items')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div className="items-container">
      <h1>Items</h1>
      {items.map(item => (
        <div key={item.id} className="item-card">
          <h2>{item.name}</h2> 
          <p>Price: {item.price}</p>
          <p>Stock Quantity: {item.stock}</p> 
          <p>Sku: {item.sku}</p>
          <img src={item.img_url} alt={item.name}/> 
        </div>
      ))}
    </div>
  );
};

export default Items;

