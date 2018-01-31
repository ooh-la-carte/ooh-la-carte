import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Dropdown, Button, Form, Radio } from 'semantic-ui-react';
import '../style.scss';

import options from '../formOptions';

const axios = require('axios');

const styles = { btnDiv: {
  display: 'flex',
  justifyContent: 'space-around',
} };

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

        <h1>Where & When</h1>
        <Form.Field>
          <input
            placeholder='Austin, TX'
            value={this.state.date}
            onChange={true}
          />
        </Form.Field>

        <br/>
        <div id='datePkr'>
          <Dropdown
            placeholder='Jan'
            fluid
            selection
            options={options.monthOptions}
          />
          <Dropdown
            placeholder='1'
            fluid
            selection
            options={options.dateOptions}
          />
          <Dropdown
            placeholder='2018'
            fluid
            selection
            options={options.yearOptions}
          />
        </div>

        <br/>

        <h1>Meal</h1>
        <Form.Group inline>
          <Radio
            label='Breakfast'
            value='breakfast'
            checked={value === 'breakfast'}
            onChange={this.handleChange}
          />
          <Radio label='Lunch' value='lunch' checked={value === 'lunch'} onChange={this.handleChange} />
          <Radio label='Dinner' value='dinner' checked={value === 'dinner'} onChange={this.handleChange} />
        </Form.Group>

        <br/>


        <div style={styles.btnDiv}>
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
    );
  }
}


export default CreateEventForm;
