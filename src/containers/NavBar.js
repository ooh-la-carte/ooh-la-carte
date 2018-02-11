import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Icon, Menu, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setSocket, removeSocket, listenerOn, changeSort } from '../actions';
import '../style.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

    let sortByField;
    if (currentPage === 'browseEvents') {
      sortByField = (
        <Menu.Item className='nav'>
          <Dropdown className="right" pointing={true} text='Sort By'>
            <Dropdown.Menu>
              <Dropdown.Item className='nav' text='None' onClick={() => { this.props.changeSort('None'); }} />
              <Dropdown.Item className='nav' text='Cuisine' onClick={() => { this.props.changeSort('Cuisine'); }} />
              <Dropdown.Item className='nav' text='Size' onClick={() => { this.props.changeSort('Size'); }} />
              <Dropdown.Item className='nav' text='Budget' onClick={() => { this.props.changeSort('Budget'); }} />
              <Dropdown.Item className='nav' text='Location' onClick={() => { this.props.changeSort('Location'); }} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      );
    } else if (currentPage === 'browseChefs') {
      sortByField = (
        <Menu.Item className='nav'>
          <Dropdown className="right" pointing={true} text='Sort By'>
            <Dropdown.Menu>
              <Dropdown.Item className='nav' text='None' onClick={() => { this.props.changeSort('None'); }} />
              <Dropdown.Item className='nav' text='Cuisine' onClick={() => { this.props.changeSort('Cuisine'); }} />
              <Dropdown.Item className='nav' text='Rate' onClick={() => { this.props.changeSort('Rate'); }} />
              <Dropdown.Item className='nav' text='Rating' onClick={() => { this.props.changeSort('Rating'); }} />
              <Dropdown.Item className='nav' text='Location' onClick={() => { this.props.changeSort('Location'); }} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      );
    }

    return (
      <div>
    {/* top bar */}
      {window.localStorage.getItem('userId')
        ? /* User IS logged in */
          <Menu className='nav navBarContainer'>
            <Menu.Item name='back' className='nav' fitted onClick={() => this.props.history.goBack()}>
              <Icon className='nav' name='chevron left' />
            </Menu.Item>
            <Menu.Item className='nav'>
              {pages[currentPage]}
            </Menu.Item>
            {sortByField}
            <Menu.Item className='nav'position='right'>
              <Dropdown className="right" pointing={true} icon='setting'>
                <Dropdown.Menu>
                  <Dropdown.Item className='nav' text='Log Out'
                    onClick={() => {
                      this.logout(window.localStorage.getItem('username'));
                      this.props.history.push('/');
                     }}/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu>
        : /* User IS NOT logged in */
          <Menu className='nav navBarContainer'>
            <Menu.Item name='icon' className='nav'>
              <Icon className='nav' name='home' onClick={() => this.props.history.push('/') } />
            </Menu.Item>
            <Menu.Item className='nav'>
              Ooh La Carte
            </Menu.Item>
            <Menu.Item className='nav' position='right'>
              <Dropdown className="right" pointing={true} icon='setting'>
                <Dropdown.Menu>
                  <Dropdown.Item className='nav' text='Log In' onClick={() => this.props.history.push('/loginForm') } />
                  <Dropdown.Item className='nav' text='Sign Up' onClick={() => this.props.history.push('/signUpForm') } />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu>
        }
      {/* bottom bar */}
      {window.localStorage.getItem('userId')
        ? /* User IS logged in */
        <Menu className='nav loggedInNavBarContainer' widths={4}>
            <Menu.Item className='nav' fitted onClick={() => this.props.history.push('/userProfile')}>Home</Menu.Item>
            {window.localStorage.getItem('isChef') === 'true'
                ?
                <Menu.Item className='nav' fitted onClick={() => this.props.history.push('/browseEvents')}>Events</Menu.Item>
                :
                <Menu.Item className='nav' fitted onClick={() => this.props.history.push('/browseChefs')}>Chefs</Menu.Item>
              }
            <Menu.Item className='nav' fitted onClick={() => this.props.history.push('/chatList')}>Chat</Menu.Item>
            <Menu.Item className='nav' fitted onClick={() => this.props.history.push('/notifications')}>Alerts</Menu.Item>
          </Menu>
        : null }

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));

