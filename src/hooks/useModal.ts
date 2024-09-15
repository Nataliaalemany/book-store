import { ReactNode, useState } from "react";

export default function useModal() {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isCentered, setIsCentered] = useState<boolean>(false);

  const handleModal = (content: ReactNode, isPositionCenetered: boolean): void => {
    setIsShowing(!isShowing);
    if (content) {
      setModalContent(content);
      setIsCentered(isPositionCenetered);
    }
  }

  return { isShowing, handleModal, modalContent, isCentered };
}
