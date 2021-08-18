import React from 'react'
import './Header.scss';

import logo from './../../assets/img/logo.png';

function Header() {
    return (
        <header className="Header">
             <div className="Header__logo">
                <figure>
                    <img src={logo} alt="react-pos"  />
                </figure>
                <div>
                    <h1>REACT POS</h1>
                    <p>Copyright 2020 @alfarisilab.com</p>
                </div>
             </div>
        </header>
    )
}

export default Header
