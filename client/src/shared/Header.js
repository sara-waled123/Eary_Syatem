import React from 'react';
import './style/Header.css';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className='logo'>
                    <Link to={"/"}>
                        <h3>Eeary</h3>
                        <img src={logo} alt="LOGO" />
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/about'}>About</Link></li>
                        <li><Link to={'/contact'}>Contact Us</Link></li>
                        <li><Link to={'/login'}>Login</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;