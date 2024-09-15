import { TrashIcon } from "@heroicons/react/24/outline";
import useCart from "../../hooks/useCart";
import { BookType } from "../../types/Book.type";
import BookImage from "../book/BookImage";

type CartItemProps = {
  book: BookType;
}

export default function CartItem({ book }: CartItemProps) {
  const { removeCartItem, updateBookCount } = useCart();

  return (
    <div className="flex flex-row w-full h-32 px-2 py-2 overflow-hidden border-b-2">
      <div className="flex items-center justify-center w-24">
        <BookImage bookCoverThumbnail={book.imageLinks?.smallThumbnail} bookTitle={book.title} />
      </div>

      <div className='relative w-3/4 pl-2'>
        <div className="flex flex-row items-center justify-between">
          <div className="flex-grow overflow-hidden w-14 text-ellipsis whitespace-nowrap" title={book.title}>
            {book.title}
          </div>

          <TrashIcon
            onClick={() => removeCartItem(book)}
            className="flex-shrink-0 w-4 text-gray-600 cursor-pointer hover:text-black"
          />
        </div>

        <div className='py-2 font-bold text-red-400'>{book.saleInfo.price} {book.saleInfo.currency}</div>

        <div className="absolute bottom-0">
          <div className="flex flex-row py-2">
            <button
              className="flex items-center justify-center w-6 h-6 text-2xl border hover:bg-gray-50"
              onClick={() => updateBookCount(book, -1)}
            >-</button>

            <div className="flex items-center justify-center w-12 h-6 mx-1 border bg-slate-100">{book.count}</div>

            <button
              className="flex items-center justify-center w-6 h-6 text-2xl border hover:bg-gray-50"
              onClick={() => updateBookCount(book, +1)}
            >+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
