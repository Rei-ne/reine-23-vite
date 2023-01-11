import './index.scss';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import LogoS from '../../assets/images/devlogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {


    return (

        <div className="nav-bar">
            <nav className="desktop">
                <NavLink exact='true' activeclassname='active' className='nav-link' to='/'>
                    HOME
                </NavLink>
                <NavLink exact='true' activeclassname='active' className='nav-link' to='/about'>
                    ABOUT ME
                </NavLink>
                <NavLink exact='true' activeclassname='active' className='nav-link' to='/work'>
                    MY WORK
                </NavLink>
                <NavLink exact='true' activeclassname='active' className='nav-link' to='/contact'>
                    CONTACT ME
                </NavLink>
            </nav>
            <nav className="mobile">
                <NavLink exact='true' activeclassname='active' className='nav-link' to='/'>
                    HOME
                </NavLink>
                <NavLink exact='true' activeclassname='active' className='nav-link' to='/about'>
                    ABOUT
                </NavLink>
                <NavLink exact='true' activeclassname='active' className='nav-link' to='/work'>
                    WORKS
                </NavLink>
                <NavLink exact='true' activeclassname='active' className='nav-link' to='/contact'>
                    CONTACT
                </NavLink>
            </nav>
        </div>
    )

}
export default Navbar;

