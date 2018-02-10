import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSocket, removeSocket, listenerOn, changeSort } from '../actions';
import '../style.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      sort: false,
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  toggleDropDown() {
    this.setState({
      dropdown: !this.state.dropdown,
      sort: false,
    });
  }

  toggleSortMenu = () => {
    console.log(this.state.sort);
    this.setState({
      sort: !this.state.sort,
      dropdown: false,
    });
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
    <div>
      {window.localStorage.getItem('userId')
        ?
          <div className='navBarContainer'>
            <div className='navBarTitle'><div style={{ color: 'white' }}>{pages[currentPage]}</div></div>
              {currentPage === 'browseEvents'
                ?
                  <div className='sortBy'>
                    <span onClick={() => { this.toggleSortMenu(); }}>Sort</span>
                    {this.state.sort
                      ? <div className='loginDropdown'>
                          <div className='dropdownLinkContainer sortLinks' onClick={() => {
                            this.props.changeSort('');
                            this.toggleSortMenu();
                          }}>None</div>
                          <div className='dropdownLinkContainer sortLinks' onClick={() => {
                            this.props.changeSort('Cuisine');
                            this.toggleSortMenu();
                          }}>Cuisine</div>
                          <div className='dropdownLinkContainer sortLinks' onClick={() => {
                            this.props.changeSort('Size');
                            this.toggleSortMenu();
                          }}>Party size</div>
                          <div className='dropdownLinkContainer sortLinks' onClick={() => {
                            this.props.changeSort('Budget');
                            this.toggleSortMenu();
                          }}>Budget</div>
                          <div className='dropdownLinkContainer sortLinks' onClick={() => {
                            this.props.changeSort('Location');
                            this.toggleSortMenu();
                          }}>Location</div>
                        </div>
                      : null
                    }
                  </div>
                : null
              }
              <span className='sortNavBarLogin' >
                <a className='loginDropdownText' onClick={this.toggleDropDown}><Icon name='setting' /></a>
                {this.state.dropdown
                  ?
                    <div className='loginDropdown'>
                      <div className='dropdownLinkContainer' onClick={() => this.logout(window.localStorage.getItem('username')) }>
                        <Link to='/' className='loginLink'>Log out</Link>
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
    changeSort,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

