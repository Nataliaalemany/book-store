import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../../context/CartContext';
import { ModalContext } from "../../context/ModalContext";
import useCart from '../../hooks/useCart';
import CartItem from './CartItem';

export default function Cart() {
  const { handleModal } = useContext(ModalContext);
  const { cartContent } = useContext(CartContext);
  const { cartSubtotal, emptyCart } = useCart();

  function handleCheckout() {
    emptyCart();

    toast("Demo site: Purchase simulation complete.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progressStyle: { background: "blue" },
      progress: undefined,
      theme: "light",
      closeOnClick: false,
      closeButton: false,
      pauseOnHover: false,
      zIndex: 9999
    });
  }

  const emptyShoppingCart =
    <div className='mx-2'>
      <p className="my-2 text-gray-500 ">0 items</p>

      <div className="flex justify-center mt-5 mb-3">
        <p>Your cart is empty</p>
      </div>

      <button
        className="w-full p-3 my-2 font-bold text-white border rounded-md bg-amber-400 hover:shadow-lg"
        onClick={(() => handleModal(false))}
      >
        Continue Shopping
      </button>
    </div>

  const shoppingCartWithItems =
    <>
      <div className='overflow-y-auto'>
        {cartContent?.map((book, index) => (
          <div key={book.id + index}>
            <CartItem book={book} />
          </div>
        ))}
      </div>

      <div className='px-2 font-bold bg-white'>
        <div className='flex justify-between py-2'>
          <p>SUBTOTAL:</p>
          <p className='text-red-400'>{cartSubtotal} HUF</p>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full p-3 my-2 text-white border rounded-md bg-amber-400 hover:shadow-lg"
        >
          Check Out
        </button>

        <ToastContainer />
      </div>
    </>

  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-2">
        <p className="text-base font-bold">Shopping Cart</p>

        <XMarkIcon
          onClick={(() => handleModal(false))}
          className="w-5 text-gray-600 cursor-pointer hover:text-black"
        />
      </div>

      {cartContent?.length > 0 ? shoppingCartWithItems : emptyShoppingCart}
    </div >
  )
}
