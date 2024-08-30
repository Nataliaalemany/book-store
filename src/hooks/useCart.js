import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function useCart(book = null) {
  const { cartContent, setCartContent } = useContext(CartContext);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    calculateCartCount();
    calculateSubtotal();
  }, [cartContent])
  
  function addBookToCart() {
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

  function calculateCartCount() {
    const finalCount = cartContent?.reduce((total, book) => {
      return total + book.count;
    }, 0);
    setCartCount(finalCount);
  }

  function calculateSubtotal() {
    const subtotal = cartContent.reduce((total, book) => {
      return total + (book.saleInfo.price * book.count);
    }, 0);
    setCartSubtotal(subtotal);
  }

  function updateBookCount(quantity) {
    setCartContent(prevCartContent => {
      return prevCartContent.map(item => {
        if (item.id === book.id) {
          return { ...item, count: Math.max(item.count + quantity, 1) };
        }
        return item;
      });
    });
  }

  function removeCartItem() {
    setCartContent((prevCartContent) => {
      return prevCartContent.filter((bookInCart) => bookInCart.id !== book.id);
    });
  }

  function emptyCart() {
    setCartContent([]);
  }

  return { addBookToCart, cartCount, cartSubtotal, emptyCart, removeCartItem, updateBookCount };
}
