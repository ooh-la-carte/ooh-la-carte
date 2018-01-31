import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Header, Modal } from 'semantic-ui-react';
import SignUpForm from './SignUpForm';
import '../style.scss';

const axios = require('axios');

class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      signedIn: false,
    };
  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
    this.props.toggleDropDown();
  }

  submitCreds = (credsObj) => {
    const { username, password1, password2 } = credsObj;
    const url = '/api/signup';
    if (!(username && password1) || !(password1 === password2)) {
      console.log(username, password1, password2);
      console.log('invalid entries');
    } else {
      console.log('submitting');
      axios.post(url, credsObj)
        .then((response) => {
          if (response.status === 200) {
            console.log('response received from server');
            window.localStorage.accessToken = response.data.token;
            window.localStorage.userId = response.data.userId;
            this.handleClose();
            this.props.changeCurrentPage('Home');
          }
        })
        .catch((error) => {
          console.log(error);
          this.handleOpen('Login Error', 'Incorrect Username or Password');
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.signedIn === true ? <Redirect to="/" /> : ''}
        <Modal
          trigger={<a onClick={this.handleOpen} className='loginLink'>Sign up</a>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small'
        >
          <Header icon='user circle' content='Sign Up' />
          <Modal.Content>
            <div>
              <SignUpForm
                handleClose={this.handleClose}
                toggleDropDown={this.props.toggleDropDown}
                submitCreds={this.submitCreds}
              />
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default SignUpModal;

