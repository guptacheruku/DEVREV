import React from 'react';
import Nav1 from './nav1';
import '../CSS/cart.css';
const Cart = ({ cartItems }) => {

  return (
    
    <div>
      <Nav1/>
      <div>
        <ul style={{display:'flex', flexDirection: 'column'}}>
            <h2>Cart</h2>
            <p>Total Items in Cart: {cartItems.length}</p>
            {cartItems.map((item) => {
            const { id, volumeInfo } = item;
            const { title, authors } = volumeInfo;

            return (
                <li key={id} style={{backgroundColor:'#f5f5f5',borderRadius:'5px',padding:'10px',marginBottom:'10px',minWidth:'50%',display:'flex',flexDirection:'column',justifyContent:'space-around'}} >
                <h3 >{title}</h3>
                <p>Author(s): {authors ? authors.join(', ') : 'N/A'}</p>
                </li>
            );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
