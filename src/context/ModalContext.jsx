import { createContext } from 'react';
import ModalApp from '../components/ModalApp';
import useModal from '../hooks/useModal';

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
