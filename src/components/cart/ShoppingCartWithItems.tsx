import { useContext } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../../context/CartContext';
import useCart from '../../hooks/useCart';
import CartItem from './CartItem';

export default function ShoppingCartWithItems() {
  const { cartContent } = useContext(CartContext);
  const { cartSubtotal, emptyCart } = useCart();

  function handleCheckout() {
    toast('Purchase simulation complete.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      progressStyle: { background: 'blue' },
      progress: undefined,
      theme: 'light',
      closeOnClick: false,
      closeButton: true,
      pauseOnHover: false,
    });

    emptyCart();
  }

  return (
    <>
      <div className="overflow-y-auto">
        {cartContent.map((book, index) => (
          <div key={book.id + index}>
            <CartItem book={book} />
          </div>
        ))}
      </div>

      <div className="px-2 font-bold bg-white">
        <div className="flex justify-between py-2">
          <p>SUBTOTAL:</p>
          <p className="text-red-400">{cartSubtotal} HUF</p>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full p-3 my-2 text-white border rounded-md bg-amber-400 hover:shadow-lg"
        >
          Check Out
        </button>
      </div>
    </>
  );
}
