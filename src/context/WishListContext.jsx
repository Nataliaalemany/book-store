import { createContext, useState } from 'react';

export const WishListContext = createContext({});

export default function WishListContextProvider({ children }) {
  const [wishListContent, setWishListContent] = useState([]);

  return (
    <WishListContext.Provider value={{ wishListContent, setWishListContent }}>
      {children}
    </WishListContext.Provider>
  )
}
