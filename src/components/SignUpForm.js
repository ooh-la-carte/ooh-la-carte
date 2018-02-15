import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Icon, Form, Input, Dropdown, Label } from 'semantic-ui-react';
import axios from 'axios';
import '../style.scss';
import options from '../formOptions';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { creds: {
      username: '',
      password1: '',
      password2: '',
      email: '',
      value: false,
    } };
  }

  setUsername = (e) => {
    this.setState({ creds:
      Object.assign(this.state.creds, { username: e.target.value }) });
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  setPassword1 = (e) => {
    this.setState({ creds:
      Object.assign(this.state.creds, { password1: e.target.value }) });
  }

  setPassword2 = (e) => {
    this.setState({ creds:
      Object.assign(this.state.creds, { password2: e.target.value }) });
  }

  setEmail = (e) => {
    this.setState({ creds:
      Object.assign(this.state.creds, { email: e.target.value }) });
  }

  handleUserSelectionChange = (e, { value }) => {
    this.setState({ creds:
      Object.assign(this.state.creds, { value }) });
  }

  showRequiredFieldsLabel = () => {
    document.getElementById('invalidEntriesNotifier').classList.remove('hidden');
  }

  hideRequiredFieldsLabel = () => {
    document.getElementById('invalidEntriesNotifier').classList.add('hidden');
    this.hidePasswordMismatch();
  }

  showPasswordMismatch = () => {
    document.getElementById('passwordMismatchNotifier').classList.remove('hidden');
  }

  hidePasswordMismatch = () => {
    document.getElementById('passwordMismatchNotifier').classList.add('hidden');
  }

  submitCreds = (credsObj) => {
    const copy = Object.assign(credsObj);
    copy.username = copy.username.toLowerCase();
    const url = '/api/signup';
    const { username, password1, password2, email, value } = this.state.creds;

    if (!(username && password1 && password2 && email && value)) {
      this.showRequiredFieldsLabel();
      console.log('invalid entries');
    } else if (!(password1 === password2)) {
      this.showPasswordMismatch();
      console.log('password mismatch');
    } else {
      axios.post(url, copy)
        .then((response) => {
          if (response.status === 200) {
            console.log('response received from server');
            window.localStorage.accessToken = response.data.token;
            window.localStorage.userId = response.data.userId;
            window.localStorage.username = response.data.username;
            window.localStorage.isChef = response.data.isChef;
            this.props.history.push('/contactInfo');
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
          <h3><Icon name='user circle' /> Sign up!</h3>
          <Form.Field>
            <label>Username</label>
            <Input placeholder='Username'
              onChange={this.setUsername}
              value={this.state.creds.username}
              onFocus={this.hideRequiredFieldsLabel}
             />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input placeholder='Password'
              type='password'
              onChange={this.setPassword1}
              value={this.state.creds.password1}
              onFocus={this.hideRequiredFieldsLabel}
             />
          </Form.Field>

          <Form.Field>
            <label>Verify</label>
            <input placeholder='Retype password'
              type='password'
              onChange={this.setPassword2}
              value={this.state.creds.password2}
              onFocus={this.hideRequiredFieldsLabel}
          />
          </Form.Field>

          <div id="passwordMismatchNotifier" className="hidden">
            <Label basic color='red' pointing>Passwords don't match</Label>
          </div>

          <Form.Field>
            <label>Email</label>
            <Input
              placeholder='anthonyB@confidential.com'
              onChange={this.setEmail}
              value={this.state.creds.email}
              onFocus={this.hideRequiredFieldsLabel}
             />
          </Form.Field>

          <div id='chefDrpDwn'>
            <Dropdown
              onChange={this.handleUserSelectionChange}
              placeholder="Will this be a client or chef account?"
              fluid
              selection
              options={options.userOptions}
              onFocus={this.hideRequiredFieldsLabel}
            />
          </div>

          <br/>

          <div id="invalidEntriesNotifier" className="hidden">
            <Label basic color='red' pointing>Please correct invalid entries</Label>
          </div>

          <br/>

          <Link to='/'>
            <Button
              color='grey'
            >
              <Icon name='x' /> Cancel
            </Button>
          </Link>

          <Button
            type='button'
            color='green'
            onClick={() => {
              this.submitCreds(this.state.creds);
            }}
          >
            <Icon name='checkmark' /> Sign Up
          </Button>

        </Form>
      </div>
    );
  }
}

export default withRouter(SignUpForm);
