import { Dialog, DialogPanel } from "@headlessui/react";
import { useContext } from "react";
import { ModalContext } from "./context/ModalContext";

export default function ModalApp() {
  const { isShowing, handleModal, modalContent, isCentered } = useContext(ModalContext);
  const center = "flex items-center justify-center min-h-full p-4";
  const sidebar = "fixed top-0 right-0 text-xs bg-white w-80 h-screen";

  if (!isShowing) {
    return;
  }

  return (
    <Dialog open={isShowing} as="div" className="relative z-10 opacity-100 focus:outline-none" onClose={handleModal}>
      <div className="fixed inset-0 z-10 bg-black bg-opacity-75">
        <div className={isCentered ? center : sidebar}>
          <DialogPanel transition>
            {modalContent}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
