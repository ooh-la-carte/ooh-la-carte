import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Dropdown, Button, Icon, Form, Radio } from 'semantic-ui-react';
import '../style.scss';

import options from '../formOptions.js'

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      hostId: window.localStorage.userID,
      chefID: '',
      date: '',
      location: '',
      meal: '', // breakfast, brunch, lunch, dinner
      cuisine: '',
      description: '',
      partySize: '',
    };
  }

  handleSubmit = () => {
    const eventObj = {
      hostId: window.localStorage.userId,
      date: this.state.date,
      location: this.state.location,
      partySize: this.state.partySize,
      meal: this.state.meal,
      cuisine: this.state.cuisine,
      description: this.state.desciption,
    };
    const url = '/api/events';
    if (!username || !password) {
      // this.handleOpen('Login Error', 'Username and Password can\'t be blank');
      console.log('invalid credentials');
    } else {
      console.log('submitting');
      axios.post(url, credObj)
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.accessToken = response.data.token;
            window.localStorage.userId = response.data.userId;
            this.handleClose();
            this.props.changeCurrentPage('Home');
          }
        })
        .catch((error) => {
          console.log(error);
          this.handleOpen('Login Error', 'Incorrect Username or Password');
        });
    }
  }

  render() {
    return (
      <Form>
        {this.state.submitted === true ? <Redirect to="/punishment" /> : ''}

        <Form.Field>
          <label>Where</label>
          <input
            placeholder='Austin, TX'
            value={this.state.date}
            onChange={true}
          />
        </Form.Field>

        <br/>

        <Form.Field>
          <label>When</label>
          <Dropdown
            placeholder='Select Month'
            fluid
            selection
            options={options.monthOptions}
          />
        </Form.Field>

        <Form.Group inline>
          <label>Size</label>
          <Form.Radio label='Breakfast' value='breakfast' checked={value === 'breakfast'} onChange={this.handleChange} />
          <Form.Radio label='Lunch' value='lunch' checked={value === 'lunch'} onChange={this.handleChange} />
          <Form.Radio label='Dinner' value='dinner' checked={value === 'dinner'} onChange={this.handleChange} />
        </Form.Group>


          <Dropdown
            placeholder='Select Date'
            fluid
            selection
            options={options.dateOptions}
          />

        <Button
          type='submit'
          color='linkedin'
          inverted
          onClick={() => {
            this.props.handleClose();
            this.props.toggleDropDown();
          }}
        >
          Submit
        </Button>

        <div>
          <Link to='/'>
            <Button
              color='linkedin'
              inverted
            >
              Cancel
            </Button>
          </Link>
        </div>

      </Form>
    );
  }
}


export default CreateEventForm;
