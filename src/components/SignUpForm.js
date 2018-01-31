import React, { Component } from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import '../style.scss';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { creds: {
      username: '',
      password1: '',
      password2: '',
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

  render() {
    return (
      <Form onSubmit={() => { this.props.submitCreds(this.state.creds); }}>
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

        <br/>

        <Button
          type='submit'
          color='green'
          onClick={() => {
            this.props.submitCreds(this.state.creds);
          }}
          inverted
        >
          <Icon name='checkmark' /> Sign Up
        </Button>

        <Button
          color='grey'
          onClick={() => {
            this.props.handleClose();
            this.props.toggleDropDown();
          }}
          inverted
        >
          <Icon name='x' /> Cancel
        </Button>

      </Form>
    );
  }
}
export default SignUpForm;
