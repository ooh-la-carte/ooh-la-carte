import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
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
      submitted: false,
      hostId: window.localStorage.getItem('userId'),
      chefID: '',
      date: '',
      cuisine: '',
      description: '',
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
    this.setState({ state: e.target.value });
  }

  setCity = (e) => {
    this.setState({ city: e.target.value });
  }

  setZip = (e) => {
    this.setState({ zip: e.target.value });
  }

  handleSubmit = () => {
    const eventObj = this.state;
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
      console.log(this.state),
      <div>
        <Form>
          {this.state.submitted === true ? <Redirect to="/events" /> : ''}

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
                value={this.state.state}
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

            <Form.Field control={Select} label='Month' options={options.monthOptions} placeholder='Jan' />
            <Form.Field control={Select} label='Day' options={options.dateOptions} placeholder='1' />
            <Form.Field control={Select} label='Year' options={options.yearOptions} placeholder='2000' />
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
              onChange={this.setPartySize}
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
              onClick={() => {
                this.props.handleClose();
                this.props.toggleDropDown();
              }}
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


export default CreateEventForm;
