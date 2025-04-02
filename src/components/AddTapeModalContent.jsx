import React, { useState, useEffect } from "react";
import m from "./AddTapeModalContent.module.css";
import g from "../global.module.css";

function ModalContent({ onClose, onTapeAdded }) {

  // State to hold the artists from the API
  const [dbArtists, setDbArtists] = useState("");

  // State to hold the artist id, title, image
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // State to hold the new artist info if that option is selected
  const [isNewArtist, setIsNewArtist] = useState(false);
  const [newArtist, setNewArtist] = useState("");

  // Load the artists from the API on intial render for the select dropdown
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/artists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDbArtists(data);
        if (data.length > 0) {
          setArtist(data[0].id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Toggle the select and the input for artists
  const handleArtistSelectChange = (eventTrigger) => {
    if (eventTrigger.target.value === "-1") {
      setIsNewArtist(true);
      setArtist("");
    } else {
      setIsNewArtist(false);
      setArtist(eventTrigger.target.value);
    }
  };

  // Send the form data to the API
  const handleFormSubmit = async (event) => {

    // Stop the HTML form from submitting
    event.preventDefault();

    // Get the artist ID from the state
    let artistId = artist;

    // If the artist is new, create it before creating the tape
    if (isNewArtist) {

      const newArtistFetchMeta = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newArtist })
      };

      // First, create the new artist by sending a POST request to the API
     fetch("http://localhost:3000/artists", newArtistFetchMeta)
        .then((response) => response.json())
        .then((data) => {
          artistId = data.artistId;
        });

    }

    // Create FormData object to send the tape data including the image file
    const formData = new FormData();
    formData.append("artist_id", artistId);
    formData.append("title", title);
    formData.append("image", image);

    // Send the POST request to the API to create new tape
    fetch("http://localhost:3000/tapes", { 
        method: "POST", 
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }, 
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));

    // Call the onTapeAdded function that was passed as a prop
    //    @NOTE: This is passed down from AllTapes.jsx and just calls the fetchTapes function to repopulate the tapes
    onTapeAdded();

    // Close the modal.
    onClose();

  };

  return (
    <div className={m['modal-container']}>
      <div className={`${m['modal']} ${g['card']}`}>
        <h3>Add a new tape</h3>
        <form action="" className={`${g['form-group']} ${g['grid-container']}`} onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className={g['col-6']}>
            <label htmlFor="artist">Artist</label>
            {!isNewArtist ? (
              <select
                name="artist"
                id="artist"
                value={artist}
                onChange={handleArtistSelectChange}>
                {dbArtists && dbArtists.map((artist, index) => (
                  <option key={artist.id} value={artist.id}>{artist.name}</option>
                ))}
                <option value="-1">+ New Artist + </option>
              </select>
            ) : (
              <>
                <input
                  type="text"
                  name="artist"
                  id="artist"
                  value={newArtist}
                  onChange={(e) => setNewArtist(e.target.value)}
                />
                <button className={`${g['button']} ${m['modal__show-list']}`} onClick={() => setIsNewArtist(false)}>Show List</button>
              </>
            )}
          </div>
          <div className={g['col-6']}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="image">Image</label>
            <input type="file"
              name="image"
              id="image"
              onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className={g['col-12']}>
            <button className={g['button']} type="submit">Add tape</button>
          </div>
        </form>
        <button onClick={onClose} className={m["modal__close-button"]}>x</button>
      </div>
    </div>
  );
}

export default ModalContent;
