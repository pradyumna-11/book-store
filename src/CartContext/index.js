import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  updateQuantity: () => {},
});

export default CartContext;
