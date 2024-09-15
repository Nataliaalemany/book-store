import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { BookType } from "../types/Book.type";

export default function useCart() {
  const { cartContent, setCartContent } = useContext(CartContext);
  const [cartSubtotal, setCartSubtotal] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    calculateCartCount();
    calculateSubtotal();
  }, [cartContent])

  function addBookToCart(book: BookType): void {
    setCartContent(prevCartContent => {
      const existingBook = prevCartContent.find(item => item.id === book.id);
      if (existingBook) {
        return prevCartContent.map(item =>
          item.id === book.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prevCartContent, book];
    });
  }

  function calculateCartCount(): void {
    const finalCount = cartContent.reduce((total, book) => {
      return total + book.count;
    }, 0);
    setCartCount(finalCount);
  }

  function calculateSubtotal(): void {
    const subtotal = cartContent.reduce((total, book) => {
      return total + (book.saleInfo.price * book.count);
    }, 0);
    setCartSubtotal(subtotal);
  }

  function updateBookCount(book: BookType, quantity: number): void {
    setCartContent(prevCartContent => {
      return prevCartContent.map(item => {
        if (item.id === book.id) {
          return { ...item, count: Math.max(item.count + quantity, 1) };
        }
        return item;
      });
    });
  }

  function removeCartItem(book: BookType): void {
    setCartContent((prevCartContent) => {
      return prevCartContent.filter((bookInCart) => bookInCart.id !== book.id);
    });
  }

  function emptyCart(): void {
    setCartContent([]);
  }

  return { addBookToCart, cartCount, cartSubtotal, emptyCart, removeCartItem, updateBookCount };
}
