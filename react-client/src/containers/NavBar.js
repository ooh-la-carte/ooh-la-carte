import React from 'react';
import { Link } from 'react-router-dom';
import '../style.scss';

const NavBar = () => (
    <div className='landingPageImage'>
      <div className='navBarContainer'>
        <div className='navBarTitle'><Link to='/' style={{ color: 'white' }}>Home</Link></div>

        <span className='navBarLink'><Link to='/browseEvents' style={{ color: 'white' }}>Events</Link></span>
        <span className='navBarLink'><Link to='/browseChefs' style={{ color: 'white' }}>Chefs</Link></span>
        <span className='navBarLink'><Link to='/chat' style={{ color: 'white' }}>Chat</Link></span>
      </div>
    </div>
);


export default NavBar;
