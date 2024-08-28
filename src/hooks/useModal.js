import { useState } from "react";

export default function useModal() {
  const [isShowing, setIsShowing] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [isCentered, setIsCentered] = useState('');

  let handleModal = (content = false, position) => {
    setIsShowing(!isShowing);
    if (content) {
      setModalContent(content);
      console.log(position, 'position')
      setIsCentered(position);
    } 
  }

  return { isShowing, handleModal, modalContent, isCentered };
}
