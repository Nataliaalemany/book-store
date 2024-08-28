import React, { useState } from 'react';
import useCart from './hooks/useCart';

export default function CartButton({ book }) {
  const [buttonText, setButtonText] = useState('Add To Cart');
  const { addBookToCart } = useCart(book);

  function handleAddBookToCart() {
    addBookToCart();

    setButtonText('Added');
    setTimeout(() => {
      setButtonText('Add To Cart');
    }, 1000);
  }

  return (
    <button
      className="flex justify-center border-solid rounded-md p-1.5 w-full h-9 text-white font-semibold bg-amber-400 text-sm hover:shadow-lg"
      onClick={handleAddBookToCart}
    >
      {buttonText}
    </button>
  )
}
