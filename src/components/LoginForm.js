import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Icon, Form } from 'semantic-ui-react';
import '../style.scss';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  setUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  setPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  submitCreds = (username, password) => {
    const credObj = {
      username,
      password,
    };
    const url = '/api/login';
    if (!username || !password) {
      console.log('invalid credentials');
    } else {
      console.log('submitting');
      axios.post(url, credObj)
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.accessToken = response.data.token;
            window.localStorage.userId = response.data.userId;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className='loginForms'>
        <Form>
          <h3><Icon name='user circle' /> Login!</h3>
          <Form.Field>
            <label>Username</label>
            <input
              placeholder='Username'
              onChange={this.setUsername}
              value={this.state.username}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder='Password'
              type='password'
              onChange={this.setPassword}
              value={this.state.password}
            />
          </Form.Field>
          <Form.Field>
          </Form.Field>
          <br/>

          <Link to='/'>
            <Button
              color='grey'
              onClick={this.props.handleClose}
            >
              <Icon name='x' /> Cancel
            </Button>
          </Link>

          <Button
            type='button'
            color='green'
            onClick={() => {
                this.submitCreds(this.state.username.toLowerCase(), this.state.password);
              }
            }
          >
            <Icon name='checkmark' /> Login
          </Button>
        </Form>
      </div>
    );
  }
}
export default LoginForm;
