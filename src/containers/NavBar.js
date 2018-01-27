import React from 'react';
import { Link } from 'react-router-dom';
import '../style.scss';

const NavBar = () => (
    <div className='landingPageImage'>
      <div className='navBarContainer'>
        <div className='navBar'><Link to='/' style={{ color: 'white' }}>Home</Link></div>

        <span className='navBar'><Link to='/browseEvents' style={{ color: 'white' }}>Events</Link></span>
        <span className='navBar'><Link to='/browseChefs' style={{ color: 'white' }}>Chefs</Link></span>
        <span className='navBar'><Link to='/chat' style={{ color: 'white' }}>Chat</Link></span>
      </div>
    </div>
);


export default NavBar;
