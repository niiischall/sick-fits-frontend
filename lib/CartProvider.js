import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const useCart = () => {
  const data = useContext(CartContext);
  return data;
};

const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
