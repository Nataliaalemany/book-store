import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { BookType } from '../types/Book.type';

type WishListContextType = {
  wishListContent: BookType[];
  setWishListContent: Dispatch<SetStateAction<BookType[]>>;
};

type WishListContextProviderProps = {
  children: ReactNode;
}

export const WishListContext = createContext<WishListContextType>({
  wishListContent: [],
  setWishListContent: () => { },
});

export default function WishListContextProvider({ children }: WishListContextProviderProps) {
  const [wishListContent, setWishListContent] = useState<BookType[]>([]);

  return (
    <WishListContext.Provider value={{ wishListContent, setWishListContent }}>
      {children}
    </WishListContext.Provider>
  )
}
