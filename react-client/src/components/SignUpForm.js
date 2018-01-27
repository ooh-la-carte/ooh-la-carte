import React from 'react';
import { Button, Icon, Form } from 'semantic-ui-react';
import '../style.scss';

const SignUpForm = props => (
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
      <label>Verify</label>
      <input placeholder='Retype password' />
    </Form.Field>
    <Form.Field>
    </Form.Field>
    <br/>
    <Button
    color='grey'
    onClick={props.handleClose}
    inverted>
      <Icon name='x' /> Cancel
    </Button>
    <Button
    type='submit'
    color='green'
    onClick={props.handleClose}
    inverted>
      <Icon name='checkmark' /> Sign Up
    </Button>
  </Form>
);

export default SignUpForm;
