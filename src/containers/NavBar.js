import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSocket, removeSocket, listenerOn } from '../actions';
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

  logout = (username) => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('isChef');
    window.localStorage.removeItem('username');
    this.props.socketReducer.emit('remove user', username);
    this.props.socketReducer.close();
    this.props.listenerOn(false);
    this.props.removeSocket();
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
      chatTab: 'Inbox',
      conversation: this.props.selectedConversation.host
        ? this.props.selectedConversation.host
        : this.props.selectedConversation.username,
    };

    return (
      <div>
    {/* top bar */}
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
                      <div className='dropdownLinkContainer' onClick={() => this.logout(window.localStorage.getItem('username')) }>
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
        : null
      }
      </div>
    {/* bottom bar */}
      {window.localStorage.getItem('userId')
        ?
          <div className='loggedInNavBarContainer'>
              <div className='navBarLink'><Link to='/userProfile' style={{ color: 'white' }}>Home</Link></div>
              {window.localStorage.getItem('isChef') === 'true'
                ?
                  <span className='navBarLink'><Link to='/browseEvents' style={{ color: 'white' }}>Events</Link></span>
                :
                  <span className='navBarLink'><Link to='/browseChefs' style={{ color: 'white' }}>Chefs</Link></span>
              }
              <span className='navBarLink'><Link to='/chatList' style={{ color: 'white' }}>Chat</Link></span>
              <span className='navBarLastLink'><Link to='/notifications' style={{ color: 'white' }}>Alerts</Link></span>

          </div>
        :
          <div className='navBarContainer'>
            <div className='navBarTitle'><Link to='/' style={{ color: 'white' }}>Ooh La Carte</Link></div>
              <span className='navBarLogin' >
                <a className='loginDropdownText' onClick={this.toggleDropDown}>Login</a>
                {this.state.dropdown
                  ?
                    <div className='loginDropdown'>
                      <div className='dropdownLinkContainer'>
                        <Link to='/loginForm' className='loginLink' onClick={this.toggleDropDown}>Login</Link>
                      </div>
                      <div className='dropdownLinkContainer'>
                        <Link to='/signUpForm' className='loginLink' onClick={this.toggleDropDown}>Sign up</Link>
                      </div>
                    </div>
                  : null
                }
              </span>
          </div>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    socketReducer: state.socketReducer,
    selectedConversation: state.selectedConversation,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSocket,
    removeSocket,
    listenerOn,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

