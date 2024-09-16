import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { BookType } from "../../types/Book.type";
import CartButton from "../cart/CartButton";
import BookImage from "./BookImage";

type BookDetailsProps = {
  book: BookType;
}

export default function BookDetails({ book }: BookDetailsProps) {
  const { handleModal } = useContext(ModalContext);

  return (
    <div className="rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
      <XMarkIcon
        onClick={() => handleModal(null, false)}
        className="absolute p-1 text-gray-600 cursor-pointer top-2 right-2 w-7 hover:text-black"
      />

      <div className="grid grid-cols-2 h-96">
        <div className="flex items-center justify-center p-4 h-96">
          <BookImage bookCoverThumbnail={book.imageLinks?.thumbnail} bookTitle={book.title} />
        </div>

        <div className="flex flex-col justify-between px-2 w-80">
          <h2 className="py-4 text-lg border-b-2 text-wrap">{book.title}</h2>

          <div className="py-4 text-xl font-bold text-red-400">{book.saleInfo.price} {book.saleInfo.currency}</div>

          <div className="flex flex-row justify-between py-4 border-b-2">

            <CartButton book={book} />
          </div>

          <div className="grid grid-cols-2 gap-2 py-3 text-xs">
            <div>Availability: </div>
            <div className="text-green-800">In Stock</div>

            {book.industryIdentifiers?.map((isbn, index) => (
              <React.Fragment key={`${isbn}${index}`}>
                <div>{isbn.type === "ISBN_10" ? "ISBN-10" : "ISBN-13"}</div>
                <div>{isbn.identifier}</div>
              </React.Fragment>
            ))}

            {book.authors
              && <>
                <div>Author: </div>
                <div>
                  {book.authors?.map((author, index) => (
                    <p key={author + index}>{author}</p>
                  ))}
                </div>
              </>
            }

            {book.categories
              && <>
                <div>Categories: </div>
                <div>
                  {book.categories?.map((category, index) => (
                    <p key={category + index}>{category}</p>
                  ))}
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
