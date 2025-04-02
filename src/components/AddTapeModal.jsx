import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './AddTapeModalContent';
import g from '../global.module.css';

function AddTapeModal( {onTapeAdded} ) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className={g['button']} onClick={() => setShowModal(true)}>+ Add Tape +</button>      
      {/* 
        Pass down the function to get all the tapes from the API
          @NOTE createPortal will render the ModalContent component outside of it's parent component. Here we are rendering it in the document.body  
      */}
      {showModal && createPortal( <ModalContent onTapeAdded={onTapeAdded} onClose={() => setShowModal(false)} /> ,document.body)}
    </>
  );
}

export default AddTapeModal;