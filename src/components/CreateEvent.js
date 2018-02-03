import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Button, Form, Radio, Select, Input, TextArea } from 'semantic-ui-react';
import '../style.scss';

import options from '../formOptions';

const axios = require('axios');

const styles = {
  btnDiv: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  rows: {
    display: 'flex',
    justifyContent: 'space-around',
  },
};

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      hostId: window.localStorage.getItem('userId'),
      hostUsername: window.localStorage.getItem('username'),
      chefID: '',
      city: '',
      stat: '',
      zip: '',
      month: '',
      date: '',
      year: '',
      cuisine: '',
      description: '',
      budget: '',
      partySize: '',
      value: 'breakfast', // breakfast, brunch, lunch, dinner
    };
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
  }

  setEventName = (e) => {
    this.setState({ eventName: e.target.value });
  }

  setCuisine = (e) => {
    this.setState({ cuisine: e.target.value });
  }

  setDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  setStat = (e) => {
    this.setState({ stat: e.target.value });
  }

  setCity = (e) => {
    this.setState({ city: e.target.value });
  }

  setZip = (e) => {
    this.setState({ zip: e.target.value });
  }

  setSubmitted = () => { this.setState({ submitted: true }); }

  handleMonthSelectionChange = (e, { value }) => {
    this.setState({ month: value });
  }

  handleDateSelectionChange = (e, { value }) => {
    this.setState({ date: value });
  }

  handleYearSelectionChange = (e, { value }) => {
    this.setState({ year: value });
  }

  handlePartySizeSelectionChange = (e, { value }) => {
    this.setState({ partySize: value });
  }

  handleBudgetChange = (e, { value }) => {
    this.setState({ budget: value });
  }

  handleSubmit = () => {
    const eventObj = this.state;
    const url = '/api/createevent';
    if (!eventObj.date || !eventObj.partySize || !eventObj.value) {
      console.log('Required fields not provided');
    } else {
      console.log('submitting event');
      axios.post(url, eventObj)
        .then((response) => {
          if (response.status === 200) {
            console.log('event submitted sucessfully');
            this.props.history.push('/userProfile');
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
      console.log(this.state),
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Event Name</label>
            <Input placeholder='My Stellar Soiree'
              onChange={this.setEventName}
              value={this.state.eventName}
            />
          </Form.Field>

          <Form.Group>
            <Form.Field>
              <label>City</label>
              <Input
                placeholder='Austin'
                value={this.state.city}
                onChange={this.setCity}
              />
            </Form.Field>

            <Form.Field>
              <label>State</label>
              <Input
                placeholder='TX'
                value={this.state.stat}
                onChange={this.setStat}
              />
            </Form.Field>

            <Form.Field>
              <label>Zip</label>
              <Input
                placeholder='Zip'
                value={this.state.zip}
                onChange={this.setZip}
              />
            </Form.Field>
          </Form.Group>

          <br/>

          <Form.Group>
            <Form.Field
              control={Select}
              onChange={this.handleMonthSelectionChange}
              label='Month'
              options={options.monthOptions}
              placeholder='Jan'
            />
            <Form.Field
              control={Select}
              onChange={this.handleDateSelectionChange}
              label='Day'
              options={options.dateOptions}
              placeholder='1'
            />
            <Form.Field
              control={Select}
              onChange={this.handleYearSelectionChange}
              label='Year'
              options={options.yearOptions}
              placeholder='2000'
            />
          </Form.Group>

          <br/>

          <h3>Meal</h3>
          <div style={styles.rows}>
            <Radio
              label='Breakfast'
              value='breakfast'
              checked={value === 'breakfast'}
              onChange={this.handleChange}
            />
            <Radio
              label='Lunch'
              value='lunch'
              checked={value === 'lunch'}
              onChange={this.handleChange}
            />
            <Radio
              label='Dinner'
              value='dinner'
              checked={value === 'dinner'}
              onChange={this.handleChange}
            />
          </div>

          <br/>

          <h3>Group Size</h3>
          <div id='partySizeDrpDwn'>
            <Dropdown
              onChange={this.handlePartySizeSelectionChange}
              placeholder="How many in your dining party?"
              fluid
              upward
              selection
              options={options.partySizeOptions}
            />
          </div>

          <br/>

          <Form.Field>
            <label>Cuisine</label>
            <Input placeholder='American Southern'
              onChange={this.setCuisine}
              value={this.state.cusine}
            />
          </Form.Field>

          <br/>

          <Form.Field>
            <label>Budget</label>
            <Input placeholder='300.00'
              onChange={this.handleBudgetChange}
              value={this.state.budget}
            />
          </Form.Field>


          <Form.Field>
          <label>Description</label>
            <TextArea
            autoHeight
            placeholder='Add any additional revelent info here...'
            rows={2}
            onChange={this.setDescription}
            />
          </Form.Field>

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
            >
              Submit
            </Button>
          </div>

          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </Form>
      </div>
    );
  }
}


export default withRouter(CreateEventForm);
