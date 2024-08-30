import { HeartIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import useWishList from "../../hooks/useWishList";
import CartButton from "../cart/CartButton";
import BookDetails from "./BookDetails";
import BookImage from "./BookImage";

export default function Book({ book }) {
  const { handleModal } = useContext(ModalContext);
  const { toggleWishlistItem, inWishList } = useWishList(book);

  return (
    <div className="flex flex-col items-center justify-center py-2 w-36">
      <button
        className="w-full h-full"
        onClick={() => handleModal(<BookDetails book={book} />, true)}
      >
        <div className="h-full">
          <div className="relative flex items-center justify-center h-48 group">

            <BookImage bookCoverThumbnail={book.imageLinks?.thumbnail} bookTitle={book.title} />

            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-white duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
            >
              <EyeIcon className="w-10 h-10 mb-2" />

              <span className="text-sm">Click for more details</span>
            </div>
          </div>
        </div>
      </button >

      <div className="w-full mt-2">
        <div
          className="pb-1 overflow-hidden text-xs font-medium whitespace-normal max-w-48 overflow-ellipsis line-clamp-2"
          title={book.title}
        >{book.title}</div>

        <div className="flex items-center justify-between">
          <div className="pb-2 text-sm font-bold text-red-400">{book.saleInfo.price} {book.saleInfo.currency}</div>

          <HeartIcon
            onClick={toggleWishlistItem}
            className={`h-6 text-gray-600 cursor-pointer hover:text-black ${inWishList ? "fill-black" : "fill-none"}`}
          />
        </div>

        <CartButton book={book} />
      </div>
    </div >
  )
}
