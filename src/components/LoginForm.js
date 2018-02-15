import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button, Icon, Form, Label } from 'semantic-ui-react';
import '../style.scss';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  setUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  setPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  showBadCredsLabel = () => {
    document.getElementById('invalidCredsNotifier').classList.remove('hidden');
  }

  hideBadCredsLabel = () => {
    document.getElementById('invalidCredsNotifier').classList.add('hidden');
  }

  submitCreds = (username, password) => {
    const credObj = {
      username,
      password,
    };
    const url = '/api/login';
    if (!username || !password) {
      this.showBadCredsLabel();
      console.log('invalid credentials');
    } else {
      console.log('submitting');
      axios.post(url, credObj)
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.accessToken = response.data.token;
            window.localStorage.userId = response.data.userId;
            window.localStorage.isChef = response.data.isChef;
            window.localStorage.username = response.data.username;
            this.props.history.push('/userProfile');
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            this.showBadCredsLabel();
          }
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
              onFocus={this.hideBadCredsLabel}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder='Password'
              type='password'
              onChange={this.setPassword}
              value={this.state.password}
              onFocus={this.hideBadCredsLabel}
            />
            <div id="invalidCredsNotifier" className="hidden">
              <Label basic color='red' pointing>Incorrect Username or Password</Label>
            </div>
          </Form.Field>
          <Form.Field>
          </Form.Field>
          <br/>
          <div className='center'>
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
          </div>
        </Form>
        <h4 className='center orbutton'>
         - or -
        </h4>
        <div className='center'>
            <Button className='myButton' href='/auth/google'>
              <Icon name='google plus' /> Sign in with Google
            </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
