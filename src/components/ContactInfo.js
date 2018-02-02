import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import '../style.scss';

class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
      phone: '',
      email: '',
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

  handleSubmit = () => {
    const eventObj = this.state;
    const url = '/api/updateContactInfo';
    console.log('submitting');
    axios.post(url, eventObj)
      .then((response) => {
        if (response.status === 200) {
          console.log('Contact Info submitted sucessfully');
          this.props.history.push('/settings');
        }
      })
      .catch((error) => {
        console.log('submission error: ', error);
      });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className='boxed center'>
          <Form.Field>
            <label>Name</label>
            <Form.Input
              placeholder={this.state.username || 'Name'}
              onChange={this.setName}
              value={this.state.name}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
              <Form.Input
                placeholder={this.state.street_name || 'Street Address'}
                type='street_address'
                onChange={this.setStreetAddress}
                value={this.state.street_address}
                width={16}
              />
              <Form.Group>
                <Form.Input
                  placeholder={this.state.city || 'City'}
                  type='city'
                  onChange={this.setCity}
                  value={this.state.city}
                  width={4}
                />
                <Form.Input
                  placeholder={this.state.state || 'State'}
                  type='state'
                  onChange={this.setstate}
                  value={this.state.state}
                  width={4}
                />
                <Form.Input
                  placeholder={this.state.zip_code || 'Zipcode'}
                  type='zip_code'
                  onChange={this.setZipcode}
                  value={this.state.zip_code}
                  width={4}
                />
              </Form.Group>
          </Form.Field>
          <Form.Field>
          <label>Phone</label>
            <Form.Input
              placeholder={this.state.phone || 'Phone'}
              onChange={this.setPhone}
              value={this.state.phone}
            />
          </Form.Field>
          <Form.Field>
          <label>Email</label>
            <Form.Input
              placeholder={this.state.email || 'Email'}
              onChange={this.setEmail}
              value={this.state.email}
            />
          </Form.Field>
          <br/>

      <div className='btnDiv'>
          <Link to='/settings'>
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
              this.props.history.push('/settings');
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

export default withRouter(ContactInfo);
