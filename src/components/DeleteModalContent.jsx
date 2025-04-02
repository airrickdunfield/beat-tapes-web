import React, {useState, useEffect} from "react";
import m from "./AddTapeModalContent.module.css";
import g from "../global.module.css";

function DeleteModalContent({ id, onClose, onTapeDeleted }) {
    
    // Send the data to the API when the user submits the form
    const handleFormSubmit = async (event) => {
      
      // Stop the HTML form from submitting
      event.preventDefault();

      // Send the POST request to the API to create new tape
      fetch(`http://localhost:3000/tapes/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          method: "DELETE"
        })
        .then(response => response.json())
        .then(data => console.log(data));

      // Call the onTapeAdded function that was passed as a prop
      //    @NOTE: This is passed down from AllTapes.jsx and just calls the fetchTapes function to repopulate the tapes
      onTapeDeleted();

      // Close the modal.
      onClose();

    };

    return (
      <div className={m['modal-container']}>
        <div className={`${m['modal']} ${g['card']}`}>
            <h3>Are you sure you want to delete this tape?</h3>
            <form action=""className={`${g['form-group']} ${g['grid-container']}`} onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className={g['col-12']}>
                  <button className={`${g['button']} ${g['delete']}`} type="submit">Yes, delete this tape.... RIP...</button>
                </div>
            </form>
            <button onClick={onClose} className={m["modal__close-button"]}>x</button>
        </div>
      </div>
    );
  }
  
  export default DeleteModalContent;