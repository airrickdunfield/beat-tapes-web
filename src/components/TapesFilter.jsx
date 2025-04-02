import { useState, useEffect } from 'react';

import tf from './TapeFilters.module.css';
import g from '../global.module.css';



function TapeFilters (  { updateTapes } ) {

    const [artists, setArtists] = useState([]);

    const handleFilterSubmit = async (event) => {
        event.preventDefault();
      
        const formData = new FormData(event.target);
        const selectedArtists = formData.getAll('artists');
    
        const queryString = selectedArtists.map(id => `artists=${id}`).join('&');

        fetch(`http://localhost:3000/tapes?${queryString}`)
            .then(response => response.json())
            .then(data => updateTapes(data));


    };

    useEffect(() => {
        fetch('http://localhost:3000/artists/')
            .then(response => response.json())
            .then(data => setArtists(data));
    }, []);

    return (
        <div className={tf['filters-container']}>
            <form  onSubmit={ handleFilterSubmit }>
                <div className={g['form-group']}>
                    <h4>Artists</h4>
                    {artists.map(artist => {
                        return (
                            <label key={artist.id}>
                                <input type="checkbox" name="artists" value={artist.id} />
                                {artist.name}
                            </label>
                        );
                    })}
                    <input type="submit" value="Apply" className={g['button']} />
                </div>
            </form>
        </div>
    );
};

export default TapeFilters;