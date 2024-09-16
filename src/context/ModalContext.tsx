import { createContext, ReactNode } from 'react';
import ModalApp from '../components/ModalApp';
import useModal from '../hooks/useModal';

type ModalContextType = {
  isShowing: boolean;
  handleModal: (content: ReactNode, position: boolean) => void;
  modalContent: ReactNode | false;
  isCentered: boolean;
};

type ModalContextProviderProps = {
  children: ReactNode;
};

export const ModalContext = createContext<ModalContextType>({
  isShowing: false,
  handleModal: () => {},
  modalContent: false,
  isCentered: false,
});

export default function ModalContextProvider({ children }: ModalContextProviderProps) {
  const { isShowing, handleModal, modalContent, isCentered } = useModal();

  return (
    <ModalContext.Provider value={{ isShowing, handleModal, modalContent, isCentered }}>
      {children}
      <ModalApp />
    </ModalContext.Provider>
  );
}
