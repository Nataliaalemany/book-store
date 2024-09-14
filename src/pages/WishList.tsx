import { useContext } from "react";
import { Link } from "react-router-dom";
import WishListItem from "../components/WishListItem";
import { WishListContext } from "../context/WishListContext";

export default function WishList() {
  const { wishListContent } = useContext(WishListContext);

  return (
    <div className="container flex flex-col flex-grow">
      {!wishListContent.length
        ? <div className="flex items-center justify-center flex-grow">
          Your wish list is empty, start adding books!
        </div>

        : <div className="flex flex-col items-center">
          {wishListContent?.map((book, index) => (
            <WishListItem key={book.id + index} book={book} />
          ))}
        </div>
      }

      <div className="flex justify-end w-full mt-auto">
        <Link to="/">
          <button className="p-3 my-3 font-bold text-white border rounded-md bg-amber-400 hover:shadow-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}
