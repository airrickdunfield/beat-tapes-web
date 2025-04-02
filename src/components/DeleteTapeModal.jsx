import { useState } from "react"
import { createPortal } from "react-dom"
import DeleteTapeModalContent from "./DeleteTapeModalContent";
// Add modal import here
import g from "../global.module.css";

function DeleteTapeModal( { tape, onTapeDeleted }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button 
                className={`${g["button"]} ${g["small"]} ${g["delete"]}`} 
                onClick={ () => { setShowModal(true) } }
            >Delete</button>

            {showModal && createPortal(
            <DeleteTapeModalContent 
                tape={tape}
                onTapeDeleted={onTapeDeleted}
                onClose={ () => { setShowModal( false ) }} 
            />, 
            document.body)}

        </>
    )

}

export default DeleteTapeModal;