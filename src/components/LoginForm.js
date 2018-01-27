import React from 'react';
import { Button, Icon, Form } from 'semantic-ui-react';
import '../style.scss';

const LoginForm = props => (
  <Form>
    <Form.Field>
      <label>Username</label>
      <input placeholder='Username' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' />
    </Form.Field>
    <Form.Field>
    </Form.Field>
    <br/>
    <Button
    color='grey'
    onClick={() => {
      props.handleClose();
      props.toggleDropDown();
    }}
    inverted>
      <Icon name='x' /> Cancel
    </Button>
    <Button
    type='submit'
    color='green'
    onClick={() => {
      props.handleClose();
      props.toggleDropDown();
    }}
    inverted>
      <Icon name='checkmark' /> Login
    </Button>
  </Form>
);

export default LoginForm;
