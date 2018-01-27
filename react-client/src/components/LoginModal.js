import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Header, Modal } from 'semantic-ui-react';
import LoginForm from './LoginForm';
import '../style.scss';

const axios = require('axios');

class LoginModal extends Component {
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
  }

  handleSubmit = () => {
    this.submitCreds();
    this.handleClose();
  }

  submitCreds = (username, password) => {
    const credObj = {
      username,
      password,
    };
    const url = '/api/login';
    console.log('url', url, 'credObj', credObj, 'u:', username, 'p:', password);
    if (!username || !password) {
      // this.handleOpen('Login Error', 'Username and Password can\'t be blank');
      console.log('invalid credentials');
    } else {
      console.log('submitting');
      axios.post(url, credObj)
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.accessToken = response.data.token;
            this.handleClose();
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
      <div id='loginModal'>
        {this.state.signedIn === true ? <Redirect to="/" /> : ''}
        <Modal
          trigger={<a onClick={this.handleOpen}
          className='loginLink'>Login</a>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small'
        >
          <Header icon='user circle' content='Login' />
          <Modal.Content>
            <div>
              <LoginForm
              handleClose={this.handleClose}
              submitCreds={this.submitCreds}
            />
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;

