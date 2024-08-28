import { createContext } from 'react';
import useModal from '../hooks/useModal';
import ModalApp from '../ModalApp';

export const ModalContext = createContext({});

export default function ModalContextProvider({ children }) {
  const { isShowing, handleModal, modalContent, isCentered } = useModal();

  return (
    <ModalContext.Provider value={{ isShowing, handleModal, modalContent, isCentered }}>
      {children}
      <ModalApp />
    </ModalContext.Provider>
  )
} 
