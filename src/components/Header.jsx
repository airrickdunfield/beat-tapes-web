import React, { useState, useEffect } from 'react';

import { Link } from 'react-router';
import { useNavigate } from 'react-router';

import h from './Header.module.css';
import g from '../global.module.css';
import logo from '../assets/images/logo.svg';

function Header( { isAuthenticated, setIsAuthenticated } ) {

    const navigate = useNavigate(); 

    const [logOutSuccess, setLogOutSuccess] = useState(false);

    useEffect(() => {
        if (logOutSuccess) { navigate('/'); }
    }, [isAuthenticated]);

    const handleLogout = () => {

        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Update the authentication state
        setIsAuthenticated(false);
        setLogOutSuccess(true);

    };
    
    return (
        <header className={h['header']}>
            <div className={ `${g['container']} ${h['main-nav']}`}> 
                <Link to="/">
                    <img src={logo} width={100} alt="Lofi Tapes" />
                </Link>
                <div>
                    <span className={h["header-tagline"]}>lofi beats to code<span>/</span>design<span>/</span>study to<span>.</span></span>
                    {isAuthenticated ? <button className={`${g["button"]} ${g["danger"]}`} onClick={handleLogout}>Sign Out</button> : <Link className={`${g["button"]}`} to="/sign-in">Sign In</Link>}
                </div>
            </div>
        </header>
    )
}

export default Header;