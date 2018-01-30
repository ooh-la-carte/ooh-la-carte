import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Dropdown, Button, Form, Radio } from 'semantic-ui-react';
import '../style.scss';

import options from '../formOptions';

const axios = require('axios');

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      hostId: window.localStorage.userID,
      chefID: '',
      date: '',
      location: '',
      cuisine: '',
      description: '',
      partySize: '',
      value: 'breakfast', // breakfast, brunch, lunch, dinner
    };
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
  }


  handleSubmit = () => {
    const eventObj = {
      hostId: window.localStorage.userId,
      date: this.state.date,
      location: this.state.location,
      partySize: this.state.partySize,
      meal: this.state.value,
      cuisine: this.state.cuisine,
      description: this.state.desciption,
    };
    const url = '/api/events';
    if (!eventObj.date || !eventObj.partySize || !eventObj.meal) {
      console.log('Required fields not provided');
    } else {
      console.log('submitting');
      axios.post(url, eventObj)
        .then((response) => {
          if (response.status === 200) {
            console.log('event submitted sucessfully');
          }
        })
        .catch((error) => {
          console.log('submission error: ', error);
        });
    }
  }

  render() {
    const { value } = this.state;
    return (
      <Form>
        {this.state.submitted === true ? <Redirect to="/events" /> : ''}

        <Form.Field>
          <label>Where</label>
          <input
            placeholder='Austin, TX'
            value={this.state.date}
            onChange={true}
          />
        </Form.Field>

        <br/>

        <h3>Date only</h3>
        <div class="ui calendar" id="example2">
          <div class="ui input left icon">
            <i class="calendar icon"></i>
            <input type="text" placeholder="Date" />
          </div>
        </div>

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
          <Radio
            label='Breakfast'
            value='breakfast'
            checked={value === 'breakfast'}
            onChange={this.handleChange}
          />
          <Radio label='Lunch' value='lunch' checked={value === 'lunch'} onChange={this.handleChange} />
          <Radio label='Dinner' value='dinner' checked={value === 'dinner'} onChange={this.handleChange} />
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
