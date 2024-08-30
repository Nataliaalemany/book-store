import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import useWishList from "../hooks/useWishList";
import BookImage from "./book/BookImage";
import CartButton from "./cart/CartButton";

export default function WishListItem({ book }) {
  const { removeWishListItem } = useWishList(book);

  return (
    <div className="flex justify-between w-3/4 px-2 py-4 border-b-2">
      <div className="flex">
        <div className="overflow-hidden h-36 w-36">
          <BookImage bookCoverThumbnail={book.imageLinks?.smallThumbnail} bookTitle={book.title} />
        </div>
        <div className="flex flex-col mx-4">
          <div>{book?.title}</div>

          <div className="font-bold text-red-400 ">{book.saleInfo.price} {book.saleInfo.currency}</div>
        </div>
      </div>

      <div className="flex flex-col justify-between w-44">
        <div className="flex justify-end w-full">
          <XMarkIcon
            onClick={removeWishListItem}
            className="flex-shrink-0 w-5 mx-1 text-gray-600 cursor-pointer hover:text-black"
          />
        </div>

        <CartButton book={book} />
      </div>
    </div>
  )
}
