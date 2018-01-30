import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';
import { changeCurrentPage } from '../actions';
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
      {window.localStorage.getItem('userId')
        ?
          <div className='loggedInNavBarContainer'>
              <div onClick={() => { this.props.changeCurrentPage('Home'); }} className='navBarLink'><Link to='/' style={{ color: 'white' }}>Home</Link></div>
              <span onClick={() => { this.props.changeCurrentPage('Events'); }} className='navBarLink'><Link to='/browseEvents' style={{ color: 'white' }}>Events</Link></span>
              <span onClick={() => { this.props.changeCurrentPage('Chefs'); }} className='navBarLink'><Link to='/browseChefs' style={{ color: 'white' }}>Chefs</Link></span>
              <span onClick={() => { this.props.changeCurrentPage('Profile'); }} className='navBarLastLink'><Link to='/userProfile' style={{ color: 'white' }}>Profile</Link></span>
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
                        <LoginModal toggleDropDown={this.toggleDropDown}/>
                      </div>
                      <div className='dropdownLinkContainer'>
                        <SignUpModal toggleDropDown={this.toggleDropDown}/>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCurrentPage }, dispatch);
}

export default connect(null, mapDispatchToProps)(NavBar);

