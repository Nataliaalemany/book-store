import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { BookType } from '../types/Book.type';

type CartContextType = {
  cartContent: BookType[];
  setCartContent: Dispatch<SetStateAction<BookType[]>>;
};

type CartContextProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextType>({
  cartContent: [],
  setCartContent: () => {},
});

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartContent, setCartContent] = useState<BookType[]>([]);

  return <CartContext.Provider value={{ cartContent, setCartContent }}>{children}</CartContext.Provider>;
}
