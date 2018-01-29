import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
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

  render() {
    return (
      <div>
      {window.localStorage.getItem('userId')
        ?
          <div className='navBarContainer'>
            <div className='navBarTitle'><div style={{ color: 'white' }}>{this.props.currentPage}</div></div>
              <span className='navBarLogin' >
                <a className='loginDropdownText' onClick={this.toggleDropDown}><Icon name='setting' /></a>
                {this.state.dropdown
                  ?
                    <div className='loginDropdown'>
                      <div className='dropdownLinkContainer'>
                        <h5>Log out</h5>
                      </div>
                      <div className='dropdownLinkContainer'>
                        <h5>Something else</h5>
                      </div>
                    </div>
                  : null
                }
              </span>
          </div>
        : null
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentPage: state.currentPage };
}

export default connect(mapStateToProps)(CurrentPageNavBar);
