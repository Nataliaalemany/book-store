import { createContext, useState } from "react";

export const CartContext = createContext({});

export default function CartContextProvider({ children }) {
  const [cartContent, setCartContent] = useState([]);

  return (
    <CartContext.Provider value={{ cartContent, setCartContent }}>
      {children}
    </CartContext.Provider>
  )
}
