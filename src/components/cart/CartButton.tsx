import { useState } from 'react';
import useCart from '../../hooks/useCart';
import { BookType } from '../../types/Book.type';

type CartButtonProps = {
  book: BookType;
};

export default function CartButton({ book }: CartButtonProps) {
  const [buttonText, setButtonText] = useState<string>('Add To Cart');
  const { addBookToCart } = useCart();

  function handleAddBookToCart() {
    addBookToCart(book);

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
  );
}
