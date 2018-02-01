import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Icon, Form } from 'semantic-ui-react';
import '../style.scss';

class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  // complete this component!
  componentDidMount() {
    if (window.localStorage.userId) {
      axios.get();
      this.setState();
    }
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
            window.localStorage.isChef = response.data.isChef;
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
      <div>
        <Form>
          <h3><Icon name='user circle' /> Login!</h3>
          <Form.Field>
            <label>Name</label>
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

      <div className='btnDiv'>
          <Link to='/'>
            <Button
              className='butSec'
              inverted
            > Cancel
            </Button>
          </Link>
          <Button
            className='butPri'
            type='submit'
            inverted
            onClick={() => {
              this.props.handleClose();
              this.props.toggleDropDown();
            }}
          >
            Submit
          </Button>

        </div>
        </Form>
      </div>
    );
  }
}

export default ContactInfo;
