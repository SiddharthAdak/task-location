import React from 'react';
import "./Navbar.css";
import { useUserAuth } from '../context/UserAuthContext'
function Navbar() {
    const {logOut, user} = useUserAuth();
    return (
        <div className = "navbar" >
            <h2>Location</h2>
            {user && <button onClick = {logOut} >Logout</button>}
        </div>
    )
}

export default Navbar
