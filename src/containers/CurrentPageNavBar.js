import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import '../style.scss';

class CurrentPageNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdown: false };
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  toggleDropDown() {
    this.setState({ dropdown: !this.state.dropdown });
  }

  logout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('isChef');
    this.toggleDropDown();
  }

  render() {
    const currentPage = window.location.pathname.split('/')[1];

    const pages = {
      selectedEvent: 'Event Detail',
      userProfile: 'Home',
      settings: 'Settings',
      contactInfo: 'Contact Info',
      loginForm: 'Login',
      signUpForm: 'Sign Up',
      browseEvents: 'Events',
      selectedChef: 'Chef Detail',
      browseChefs: 'Chefs',
      createEvent: 'Add Event',
      userEvents: 'Events',
      chatTab: 'Chats',
    };

    return (
      <div>
      {window.localStorage.getItem('userId')
        ?
          <div className='navBarContainer'>
            <div className='navBarTitle'><div style={{ color: 'white' }}>{pages[currentPage]}</div></div>
              <span className='navBarLogin' >
                <a className='loginDropdownText' onClick={this.toggleDropDown}><Icon name='setting' /></a>
                {this.state.dropdown
                  ?
                    <div className='loginDropdown'>
                      <div className='dropdownLinkContainer' onClick={this.logout}>
                        <Link to='/' className='loginLink'>Log out</Link>
                      </div>
                      <div className='dropdownLinkContainer'>
                        <Link to='/' className='loginLink'>Else</Link>
                      </div>
                    </div>
                  : null
                }
              </span>
          </div>
        : <Redirect to='/'/>
      }
      </div>
    );
  }
}

export default CurrentPageNavBar;
