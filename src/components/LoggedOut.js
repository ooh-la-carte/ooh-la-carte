import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import logo from '../../public/android-chrome-512x512.png';

const LoggedOut = () => (
  <div className='topLevelDiv'>
    <Image size='small' id="logo" centered src={logo} alt='logo image' />
    <div className='cardHolder'>
      <div>
        <h3 className='softText'>Thank you for visiting Ooh La Carte!</h3>
        <h4>To return to the home page please click <Link to='/'>here</Link></h4>
      </div>
    </div>
  </div>
);

export default LoggedOut;
