import { useState } from 'react';
import { createPortal } from 'react-dom';
import DeleteModalContent from './DeleteModalContent';
import g from '../global.module.css';

function DeleteTapeModal( {onTapeDeleted, id} ) {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={`${g['button']} ${g['small']} ${g['delete']}`} onClick={() => setShowModal(true)}>Delete</button>      
      {/* 
        Pass down the function to get all the tapes from the API
          @NOTE createPortal will render the ModalContent component outside of it's parent component. Here we are rendering it in the document.body  
      */}      
      {showModal && createPortal( <DeleteModalContent id={id} onTapeDeleted={onTapeDeleted} onClose={() => setShowModal(false)} /> ,document.body)}
    </>
  );
}

export default DeleteTapeModal;