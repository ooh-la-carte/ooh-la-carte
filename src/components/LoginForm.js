import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button, Icon, Form, Label, Grid, Segment, Image } from 'semantic-ui-react';
import logo from '../../public/android-chrome-512x512.png';
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
      <div>
        <h4 className='OLCtitle'>Ooh La Carte</h4>
        <div className='center boxed'>
          <Grid>
            <Grid.Column verticalAlign='middle' width={5}>
              <Image size='small' id="logo" src={logo} alt='logo image' />
            </Grid.Column>
            <Grid.Column className='textColumn' verticalAlign='middle' width={11}>
              <Segment className='textBox'>
                  <h4 className='nav center'>Welcome back!  Please enter your login information.</h4>
              </Segment>
            </Grid.Column>
          </Grid>
          <br />
        </div>
      <div className='boxed center loginForms'>
        <Form>
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
          <div className='btnDiv'>
            <Link to='/'>
              <Button
                className='btn'
                inverted
                onClick={this.props.handleClose}
              > <Icon name='x' /> Cancel
              </Button>
            </Link>
            <Button
              className='btn'
              type='submit'
              inverted
              onClick={() => {
                this.submitCreds(this.state.username.toLowerCase(), this.state.password);
              }}
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
      </div>
    );
  }
}

export default withRouter(LoginForm);
