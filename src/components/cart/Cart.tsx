import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../../context/CartContext';
import { ModalContext } from '../../context/ModalContext';
import EmptyShoppingCart from './EmptyShoppingCart';
import ShoppingCartWithItems from './ShoppingCartWithItems';

export default function Cart() {
  const { handleModal } = useContext(ModalContext);
  const { cartContent } = useContext(CartContext);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-2">
        <p className="text-base font-bold">Shopping Cart</p>

        <XMarkIcon
          onClick={() => handleModal(null, false)}
          className="w-5 text-gray-600 cursor-pointer hover:text-black"
        />
      </div>

      {cartContent.length > 0 ? <ShoppingCartWithItems /> : <EmptyShoppingCart />}
    </div>
  );
}
