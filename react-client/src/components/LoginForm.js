import React, { Component } from 'react';
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

  render() {
    return (
      <Form>
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
            onChange={this.setPassword}
            value={this.state.password}
          />
        </Form.Field>
        <Form.Field>
        </Form.Field>
        <br/>
        <Button
          color='grey'
          onClick={this.props.handleClose}
          inverted
        >
          <Icon name='x' /> Cancel
        </Button>
        <Button
          type='submit'
          color='green'
          onClick={() => { this.props.submitCreds('jason', 'jason'); } }
          inverted
        >
          <Icon name='checkmark' /> Login
        </Button>
      </Form>
    );
  }
}
export default LoginForm;
