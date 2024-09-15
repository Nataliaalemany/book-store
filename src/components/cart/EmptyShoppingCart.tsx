import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function EmptyShoppingCart() {
  const { handleModal } = useContext(ModalContext);

  return (
    <div className='mx-2'>
      <p className="my-2 text-gray-500 ">0 items</p>

      <div className="flex justify-center mt-5 mb-3">
        <p>Your cart is empty</p>
      </div>

      <button
        className="w-full p-3 my-2 font-bold text-white border rounded-md bg-amber-400 hover:shadow-lg"
        onClick={(() => handleModal(null, false))}
      >
        Continue Shopping
      </button>
    </div>
  )
}