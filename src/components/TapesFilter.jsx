import { useState, useEffect } from 'react';

import tf from './TapeFilters.module.css';
import g from '../global.module.css';



function TapeFilters ( { updateTapes } ) {

    const [ artists, setArtists ] = useState([]);

    useEffect( () => {

        fetch(`${import.meta.env.VITE_API}/artists`)
            .then( (response) => response.json() )
            .then( data => {
                setArtists(data);
            });

    }, []);

    const handleFilterSubmit = (event) => {
        event.preventDefault();

        const fitlerFormData = new FormData(event.target);
        const selectedArtists = fitlerFormData.getAll("artists");

        const queryStringArray = selectedArtists.map( (id) => `artists=${id}`);
        const queryString = queryStringArray.join("&")

        console.log(queryString)

        fetch(`${import.meta.env.VITE_API}/tapes?${queryString}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt-token")}`    
            }
        })
            .then( (response) => response.json() )
            .then( (data) => {
                updateTapes(data);
            });

    }

    return (
        <div className={tf['filters-container']}>
            <form onSubmit={handleFilterSubmit}>
                <div className={g['form-group']}>
                    <h4>Artists</h4>
                    { artists.map(artist => {
                        return (
                            <label key={artist.id}>
                                <input type="checkbox" name="artists" value={artist.id} />
                                { artist.name }
                            </label>
                        )
                    })}
                    <input type="submit" value="Apply" className={g['button']} />
                </div>
            </form>
        </div>
    );
};

export default TapeFilters;