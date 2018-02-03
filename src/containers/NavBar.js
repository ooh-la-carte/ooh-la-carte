import React, { Component } from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSocket } from '../actions';
import '../style.scss';

const socketUrl = 'http://localhost:8888/';
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { dropdown: false };
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.initSocket = this.initSocket.bind(this);
  }

  toggleDropDown() {
    this.setState({ dropdown: !this.state.dropdown });
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket() {
    if (!this.props.socketReducer.id) {
      const socket = io(socketUrl);
      socket.on('connect', () => {
        socket.userId = window.localStorage.getItem('userId');
        console.log('Connected');
        this.props.setSocket(socket);
      });
    }
  }

  render() {
    return (
      <div>
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
              <span className='navBarLink'><Link to='/chatTab' style={{ color: 'white' }}>Chat</Link></span>
              <span className='navBarLastLink'><Link to='/userProfile' style={{ color: 'white' }}>Alerts</Link></span>

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
  return { socketReducer: state.socketReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSocket }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

