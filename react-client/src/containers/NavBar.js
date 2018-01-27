import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import '../style.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdown: false };
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  toggleDropDown() {
    console.log(this.state.dropdown);
    this.setState({ dropdown: !this.state.dropdown });
  }

  render() {
    return (
      <div>
        <div className='navBarContainer'>
          {localStorage.getItem('userId')
            ? <div className='navBarTitle'><Link to='/' style={{ color: 'white' }}>Home</Link></div>
            : <div className='navBarTitle'><Link to='/' style={{ color: 'white' }}>Ooh La Carte</Link></div>
          }
          {localStorage.getItem('userId')
            ? <span className='navBarLink'><Link to='/browseEvents' style={{ color: 'white' }}>Events</Link></span>
            : null
          }
          {localStorage.getItem('userId')
            ? <span className='navBarLink'><Link to='/browseChefs' style={{ color: 'white' }}>Chefs</Link></span>
            : null
          }
          {localStorage.getItem('userId')
            ? <span className='navBarLink'><Link to='/chat' style={{ color: 'white' }}>Chat</Link></span>
            : null
          }
          {localStorage.getItem('userId')
            ? null
            :
              <span className='navBarLogin' >
                <a className='loginDropdownText' onClick={this.toggleDropDown}>Login</a>
                {this.state.dropdown
                  ?
                    <div className='loginDropdown'>
                      <div className='dropdownLinkContainer'>
                        <LoginModal />
                      </div>
                      <div>
                        <a className='loginLink'>Sign up</a>
                      </div>
                    </div>
                  : null
                }
              </span>
          }
        </div>
      </div>
    );
  }
}


export default NavBar;
