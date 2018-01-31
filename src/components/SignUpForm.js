import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Form, Input, Checkbox } from 'semantic-ui-react';
import axios from 'axios';
import '../style.scss';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { creds: {
      username: '',
      password1: '',
      password2: '',
      checked: false,
    } };
  }

  setUsername = (e) => {
    this.setState({ creds:
      Object.assign(this.state.creds, { username: e.target.value }) });
  }

  setPassword1 = (e) => {
    this.setState({ creds:
      Object.assign(this.state.creds, { password1: e.target.value }) });
  }

  setPassword2 = (e) => {
    this.setState({ creds:
      Object.assign(this.state.creds, { password2: e.target.value }) });
  }

  changeCheck = () => {
    console.log(this.state.creds.checked);
    this.setState({ creds:
      Object.assign(this.state.creds, { checked: !this.state.creds.checked }) });
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
        <Form onSubmit={() => { this.submitCreds(this.state.creds); }}>
          <h3><Icon name='user circle' /> Sign up!</h3>
          <Form.Field>
            <label>Username</label>
            <Input placeholder='Username'
              onChange={this.setUsername}
              value={this.state.creds.username}
             />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input placeholder='Password'
              type='password'
              onChange={this.setPassword1}
              value={this.state.creds.password1}
             />
          </Form.Field>

          <Form.Field>
            <label>Verify</label>
            <input placeholder='Retype password'
              type='password'
              onChange={this.setPassword2}
              value={this.state.creds.password2}
             />
          </Form.Field>
          <Checkbox
          label="I'm a chef looking for clients"
          checked={false}
          onClick={this.changeCheck}
          className='chefCheckbox'/>
          <Link to='/'>
            <Button
              color='grey'
            >
              <Icon name='x' /> Cancel
            </Button>
          </Link>

          <Button
            type='submit'
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
export default SignUpForm;
