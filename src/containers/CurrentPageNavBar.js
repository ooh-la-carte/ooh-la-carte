import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'semantic-ui-react';
import { removeSocket, listenerOn } from '../actions';
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
      notifications: 'Notifications',
      conversation: this.props.selectedConversation.host
        ? this.props.selectedConversation.host
        : this.props.selectedConversation.username,
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
        : <Redirect to='/'/>
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
    removeSocket,
    listenerOn,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPageNavBar);
