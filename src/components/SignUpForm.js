import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Form, Input, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { changeCurrentPage } from '../actions';
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

  submitCreds = (credsObj) => {
    const { username, password1, password2 } = credsObj;
    const url = '/api/signup';
    if (!(username && password1) || !(password1 === password2)) {
      console.log('invalid entries');
    } else {
      console.log('submitting');
      axios.post(url, credsObj)
        .then((response) => {
          if (response.status === 200) {
            console.log('response received from server');
            window.localStorage.accessToken = response.data.token;
            window.localStorage.userId = response.data.userId;
            window.localStorage.isChef = response.data.isChef;
            this.props.changeCurrentPage('Home');
            this.props.history.push('/userProfile');
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

          <Form.Field>
            <label>Email</label>
            <Input
              placeholder='anthonyB@confidential.com'
              onChange={this.setEmail}
              value={this.state.creds.email}
             />
          </Form.Field>

          <div id='chefDrpDwn'>
            <Dropdown
              onChange={this.handleUserSelectionChange}
              placeholder="Will this be a client or chef account?"
              fluid
              selection
              options={options.userOptions}
            />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCurrentPage }, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(SignUpForm));
