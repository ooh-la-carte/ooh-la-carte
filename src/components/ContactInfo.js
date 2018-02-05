import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import '../style.scss';

class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: window.localStorage.getItem('userId'),
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      email: '',
      bio: '',
    };
  }

  componentDidMount() {
    axios.get('/api/user/info', { params: { id: this.state.id } })
      .then((userInfo) => {
        const streetAddress = userInfo.data.street_name;
        const zipcode = userInfo.data.zip_code;
        const { name, city, state, phone, email } = userInfo.data;
        this.setState({
          name, streetAddress, city, state, zipcode, phone, email,
        });
      });
  }

  handleUpdate = (e, { type, value }) => {
    this.setState({ [type]: value });
  }

  handleSubmit = () => {
    const eventObj = this.state;
    const url = '/api/updateContactInfo';
    axios.post(url, eventObj)
      .then((response) => {
        if (response.status === 200) {
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
          <Form.Field required>
            <label>Name</label>
            <Form.Input
              type='name'
              placeholder={this.state.username || 'Name'}
              onChange={this.handleUpdate}
              value={this.state.name || ''}
            />
          </Form.Field>
          <Form.Field>
            <label>Bio</label>
            <Form.Input
              type='bio'
              placeholder={this.state.username || 'Tell us about yourself...'}
              onChange={this.handleUpdate}
              value={this.state.bio || ''}
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
              <Form.Group>
                <Form.Input
                  placeholder={this.state.city || 'City'}
                  type='city'
                  onChange={this.handleUpdate}
                  value={this.state.city || ''}
                  width={4}
                />
                <Form.Input
                  placeholder={this.state.state || 'State'}
                  type='state'
                  onChange={this.handleUpdate}
                  value={this.state.state || ''}
                  width={4}
                />
                <Form.Input
                  placeholder={this.state.zip_code || 'Zipcode'}
                  type='zipcode'
                  onChange={this.handleUpdate}
                  value={this.state.zipcode || ''}
                  width={4}
                />
              </Form.Group>
          </Form.Field>
          <Form.Field required>
          <label>Phone</label>
            <Form.Input
              type='phone'
              placeholder={this.state.phone || 'Phone'}
              onChange={this.handleUpdate}
              value={this.state.phone || ''}
            />
          </Form.Field>
          <Form.Field required>
          <label>Email</label>
            <Form.Input
              type='email'
              placeholder={this.state.email || 'Email'}
              onChange={this.handleUpdate}
              value={this.state.email || ''}
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
