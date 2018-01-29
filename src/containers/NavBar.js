import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';
import '../style.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdown: false };
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  toggleDropDown() {
    this.setState({ dropdown: !this.state.dropdown });
  }

  render() {
    return (
      <div>
      {console.log(window.localStorage)},
        <div className='navBarContainer'>
          {window.localStorage.getItem('userId')
            ? <div className='navBarTitle'><Link to='/' style={{ color: 'white' }}>Home</Link></div>
            : <div className='navBarTitle'><Link to='/' style={{ color: 'white' }}>Ooh La Carte</Link></div>
          }
          {window.localStorage.getItem('userId')
            ? <span className='navBarLink'><Link to='/browseEvents' style={{ color: 'white' }}>Events</Link></span>
            : null
          }
          {window.localStorage.getItem('userId')
            ? <span className='navBarLink'><Link to='/browseChefs' style={{ color: 'white' }}>Chefs</Link></span>
            : null
          }
          {window.localStorage.getItem('userId')
            ? <span className='navBarLink'><Link to='/chat' style={{ color: 'white' }}>Chat</Link></span>
            : null
          }
          {window.localStorage.getItem('userId')
            ? null
            :
              <span className='navBarLogin' >
                <a className='loginDropdownText' onClick={this.toggleDropDown}>Login</a>
                {this.state.dropdown
                  ?
                    <div className='loginDropdown'>
                      <div className='dropdownLinkContainer'>
                        <LoginModal toggleDropDown={this.toggleDropDown}/>
                      </div>
                      <div className='dropdownLinkContainer'>
                        <SignUpModal toggleDropDown={this.toggleDropDown}/>
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
