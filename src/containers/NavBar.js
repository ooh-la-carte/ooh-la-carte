import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Icon, Menu, Dropdown } from 'semantic-ui-react';
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
      chatList: 'Inbox',
      notifications: 'Notifications',
      conversation: this.props.selectedConversation.host
        ? this.props.selectedConversation.host
        : this.props.selectedConversation.username,
    };

    return (
      <div>
    {/* top bar */}
    <Menu className='nav navBarContainer'>

      <Menu.Item name='back' className='nav' fitted>
        <Icon className='nav' name='chevron left' />
      </Menu.Item>

      <Menu.Item className='nav menuQuarterSegment'>
        {pages[currentPage]}
      </Menu.Item>

      <Menu.Item className='nav' position='right'>
        <Dropdown className="right" pointing={true} icon='setting'>
          <Dropdown.Menu>
            <Dropdown.Item className='nav' text='Log Out' />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>

    </Menu>

{/*
    <div>
      {window.localStorage.getItem('userId')
        ?
          <div className='nav navBarContainer'>
            <div className='nav navBarTitle'>
                <a onClick={this.toggleDropDown}><Icon className='nav' name='chevron left' /></a>

            <div>{pages[currentPage]}</div></div>
              <span className='nav navBarLogin' >
                <a onClick={this.toggleDropDown}><Icon className='nav' name='setting' /></a>
                {this.state.dropdown
                  ?
                    <div className='nav loginDropdown'>
                      <div className='nav dropdownLinkContainer' onClick={() => this.logout(window.localStorage.getItem('username')) }>
                        <Link to='/' className='nav loginLink'>Log out</Link>
                      </div>
                      <div className='dropdownLinkContainer'>
                        <Link to='/' className='nav loginLink'>Else</Link>
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
          <div className='nav loggedInNavBarContainer'>
              <Link className='nav navBarLink' to='/userProfile'>Home</Link>
              {window.localStorage.getItem('isChef') === 'true'
                ?
                  <Link className='nav navBarLink' to='/browseEvents'>Events</Link>
                :
                  <Link className='nav navBarLink' to='/browseChefs'>Chefs</Link>
              }
              <Link className='nav navBarLink' to='/chatList'>Chat</Link>
              <Link className='nav navBarLastLink' to='/notifications'>Alerts</Link>

          </div>
        :
          <div className='nav navBarContainer'>
            <Link className='nav navBarTitle' to='/'>Ooh La Carte</Link>
              <span className='nav navBarLogin' >
                <a onClick={this.toggleDropDown}>Login</a>
                {this.state.dropdown
                  ?
                    <div className='nav loginDropdown'>
                      <div className='nav dropdownLinkContainer'>
                        <Link to='/loginForm' className='nav loginLink' onClick={this.toggleDropDown}>Login</Link>
                      </div>
                      <div className='dropdownLinkContainer'>
                        <Link to='/signUpForm' className='nav loginLink' onClick={this.toggleDropDown}>Sign up</Link>
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

