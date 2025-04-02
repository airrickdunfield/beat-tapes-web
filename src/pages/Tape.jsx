import { useEffect, useState } from "react";
import { Link } from "react-router";    
import { useParams } from "react-router";
import parse from 'html-react-parser';

import g from '../global.module.css';

function Tape() {

    const { id } = useParams();

    const [tapeData, setTapeData] = useState({});
    const [description, setDescription] = useState("");

    useEffect(() => {   

        // Fetch the tape with the id
        fetch(`${import.meta.env.VITE_API}/tapes/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt-token')}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setTapeData(data);
                setDescription(data.description);
            });

    }, []);

    return (
        <main className={g['container']}>
            <div className={g['grid-container']}>
                <div className={g['col-12']}>

                </div>
                <div className={g['col-4']}>
                    <img src={`${import.meta.env.VITE_API}/images/${tapeData.image_name}`} alt="Placeholder" />
                </div>
                <div className={g['col-8']}>
                <Link to="/tapes" className={`${g['button']} ${g['small']}`}>&lt; Tapes</Link>
                <h1 className={`${g["h2"]} ${g["inline-flex"]} ${g["items-center"]}`}> {tapeData.title} by {tapeData.artist}</h1>
                    <p>{parse(description ?? "")}</p>
                </div>
            </div>
        </main>
    );

}

export default Tape;