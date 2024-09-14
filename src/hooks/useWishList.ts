import { useContext, useEffect, useState } from "react";
import { WishListContext } from "../context/WishListContext";
import { BookType } from "../types/Book.type";

export default function useWishlist(book: BookType) {
  const { wishListContent, setWishListContent } = useContext(WishListContext);
  const [inWishList, setInWishList] = useState(false);

  useEffect(() => {
    const bookExists = wishListContent.some(wishListBook => wishListBook.id === book.id);
    setInWishList(bookExists);
  }, [wishListContent, book.id]);

  function toggleWishlistItem(): void {
    setWishListContent(prevWishListContent => {
      const bookExists = prevWishListContent.some(wishListBook => wishListBook.id === book.id);
      if (!bookExists) {
        return [...prevWishListContent, book];
      }
      return prevWishListContent.filter((bookInWishList) => bookInWishList.id !== book.id);
    });
  }

  function removeWishListItem(): void {
    setWishListContent((prevWishListContent) => {
      return prevWishListContent.filter((bookInWishList) => bookInWishList.id !== book.id);
    });
  }

  return { toggleWishlistItem, removeWishListItem, inWishList };
}
