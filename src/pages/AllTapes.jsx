import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import TapeFilters from '../components/TapesFilter';
import AddTapeModal from '../components/AddTapeModal';
import UpdateTapeModal from '../components/UpdateTapeModal';
import DeleteTapeModal from '../components/DeleteTapeModal';
import g from '../global.module.css';
import at from './AllTapes.module.css';


function AllTapes() {

    // This is the array to hold all of our tapes
    // Gets update on fetchTapes
    const [tapes, setTapes] = useState([]);

    // We have moved the fetchTapes to a funciton, because we want to call it both when the component mounts and when a new tape is added
    // Here we get the saved token and send it across to be decoded
    const fetchTapes = async () => {
        fetch(`${import.meta.env.VITE_API}/tapes/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt-token")}`      
            }
        })
        .then(response => response.json())
        .then(data => {
            setTapes(data);
        });
    }

    // Pass the new returned data array to the setTape state function
    const handleFilteredTapes = (tapesArray) => {
        setTapes(tapesArray);
    }

    // When the component is displayed or the tapes array is updated, fetch the tapes from the database again
    useEffect(() => {

        fetchTapes();

    }, []);

    return (
        
        <main className={g['container']}>
            <h2>Lofi Cassettes</h2>
            <div className={g['grid-container']}>
                <div className={g['col-3']}>
                        <h3>Filters</h3>
                        <TapeFilters updateTapes={handleFilteredTapes} />
                </div>
                <div className={g['col-9']}>
                    <div className={`${g['flex']} ${g['space-between']} ${g['items-center']}`}>
                        <h3>My Collection</h3>
                        {/* Pass the funciton to the AddTapeModal component down to the child */}
                        <AddTapeModal onTapeAdded={fetchTapes} />
                    </div>
                    <div className={g['grid-container']}>

                        {tapes.map( tape => {
                            return (
                                <div key={tape.id}  className={`${g['col-4']} ${g['flex']} ${g['flex-grow']}`}>
                                    <div className={`${g['card']}`}>
                                        <img src={`${import.meta.env.VITE_API}/images/${tape.image_name}`} alt="Placeholder" />
                                        <div className={g['card-content']}>
                                            <h4 className={`${at['tape-title']}`}>{tape.title}</h4>
                                            <p>{tape.artist}</p>
                                            <div className={`${at['tape-actions']}`}>
                                                <Link to={`/tapes/${tape.id}`} className={`${g['button']} ${g['small']}`}>View</Link>
                                                <UpdateTapeModal onTapeUpdated={fetchTapes} tape={tape} />
                                                <DeleteTapeModal onTapeDeleted={fetchTapes} tape={tape} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </main>
    )
}

export default AllTapes;
