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
    this.state = {
      socket: false,
      alertColor: false,
    };
  }

  componentDidMount = () => {
    setTimeout(this.listen, 500);
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
  }

  listen = () => {
    console.log('listening...');
    this.props.socketReducer.on('notification alert', () => {
      console.log('new notification received');
      this.setState({ alertColor: true });
    });
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
      createEvent: 'Create Event',
      editEvent: 'Edit Event',
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
              <Dropdown.Item text='None' onClick={() => { this.props.changeSort('none'); }} />
              <Dropdown.Item text='Cuisine' onClick={() => { this.props.changeSort('cuisine'); }} />
              <Dropdown.Item text='Party Size' onClick={() => { this.props.changeSort('partySize'); }} />
              <Dropdown.Item text='Budget' onClick={() => { this.props.changeSort('budget'); }} />
              <Dropdown.Item text='Location' onClick={() => { this.props.changeSort('location'); }} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      );
    } else if (currentPage === 'browseChefs') {
      sortByField = (
        <Menu.Item className='nav'>
          <Dropdown className="right" pointing={true} text='Sort By'>
            <Dropdown.Menu>
              <Dropdown.Item text='None' onClick={() => { this.props.changeSort('none'); }} />
              <Dropdown.Item text='Cuisine' onClick={() => { this.props.changeSort('cuisine'); }} />
              <Dropdown.Item text='Rate' onClick={() => { this.props.changeSort('rate'); }} />
              <Dropdown.Item text='Rating' onClick={() => { this.props.changeSort('rating'); }} />
              <Dropdown.Item text='Location' onClick={() => { this.props.changeSort('city'); }} />
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
          <Menu className='nav navBarContainer' size='large' >
            <Menu.Item name='back' className='nav' onClick={() => this.props.history.goBack()}>
              <Icon className='nav' name='chevron left' />
            </Menu.Item>
            <Menu.Item className='nav'>
              {pages[currentPage] || 'Ooh La Carte'}
            </Menu.Item>
            {sortByField}
            <Menu.Item className='nav' position='right'>
              <Dropdown className="right" pointing={true} icon='setting'>
                <Dropdown.Menu>
                  <Dropdown.Item className='nav' text='Update Settings'
                    onClick={() => { this.props.history.push('/settings'); }}/>
                  <Dropdown.Item className='nav' text='Log Out'
                    onClick={() => {
                      this.logout(window.localStorage.getItem('username'));
                      this.props.history.push('/loggedOut');
                     }}/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu>
        : /* User IS NOT logged in */
          <Menu className='nav navBarContainer' size='large'>
            <Menu.Item name='icon' className='nav' size='large'>
              <Icon className='nav' name='home' onClick={() => this.props.history.push('/') } />
            </Menu.Item>
            <Menu.Item className='nav'>
              Ooh La Carte
            </Menu.Item>
            <Menu.Item className='nav' position='right'>
              <Dropdown className="right" pointing={true} text='Sign In'>
                <Dropdown.Menu>
                  <Dropdown.Item text='Log In' onClick={() => this.props.history.push('/loginForm') } />
                  <Dropdown.Item text='Sign Up' onClick={() => this.props.history.push('/signUpForm') } />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu>
        }
      {/* bottom bar */}
      {window.localStorage.getItem('userId')
        ? /* User IS logged in */
        <Menu className='nav navBarContainer bottom' widths={4} size='massive'>
            <Menu.Item className='nav' fitted onClick={() => this.props.history.push('/userProfile')}>Home</Menu.Item>
            {window.localStorage.getItem('isChef') === 'true'
                ?
                <Menu.Item className='nav' fitted onClick={() => this.props.history.push('/browseEvents')}>Events</Menu.Item>
                :
                <Menu.Item className='nav' fitted onClick={() => this.props.history.push('/browseChefs')}>Chefs</Menu.Item>
              }
            <Menu.Item className='nav' fitted onClick={() => this.props.history.push('/chatList')}>Chat</Menu.Item>
            <Menu.Item className='nav' fitted onClick={() => this.props.history.push('/notifications')}>
            Alerts {this.state.alert ? <Icon name='alarm'/> : null}
            </Menu.Item>
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

