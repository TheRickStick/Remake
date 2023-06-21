import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ match }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response);
        setCart(response.data);
      } catch (err) {
        console.error('Error:', err);
      }
    };
  
    fetchCart();
  }, []);

  return (
    <div>
      {cart ? (
        <div>
          <h2>Your Cart</h2>
          {cart.Items.map((item) => (
            <div key={item.id}>
              <h3>Item: {item.name}</h3>
              <p>Quantity: {item.CartItem.quantity}</p>
              <p>Original Price: {item.CartItem.originalPrice}</p>
              <p>Purchase Price: {item.CartItem.purchasePrice}</p>
              <p>Total Price: {item.CartItem.totalPrice}</p>
              <p>Money Saved: {item.CartItem.moneySaved}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading cart...</p>
      )}
    </div>
  );
};

export default Cart;