import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Button, Form, Input, TextArea, Grid } from 'semantic-ui-react';
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
      meal: 'breakfast', // breakfast, brunch, lunch, dinner
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
    if (!eventObj.date || !eventObj.partySize || !eventObj.meal) {
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
    return (
      <div className='topLevelDiv'>
        <h1 className='center softText'>Create Event</h1>
        <div className='boxed center'>
          <div>
            <Form onSubmit={this.handleSubmit}>

              <Form.Field>
                <label>Event Name</label>
                <Input placeholder='My Stellar Soiree'
                  onChange={this.setEventName}
                  value={this.state.eventName}
                />
              </Form.Field>

              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column style={{ paddingRight: '0px' }} width={8}>
                    <Form.Field>
                      <label>City</label>
                      <Input
                        placeholder='Austin'
                        value={this.state.city}
                        onChange={this.setCity}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column style={{ padding: '0px' }} width={3}>
                    <Form.Field>
                      <label>State</label>
                      <Input
                        placeholder='TX'
                        value={this.state.stat}
                        onChange={this.setStat}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column style={{ paddingLeft: '0px' }} width={5}>
                    <Form.Field>
                      <label>Zip</label>
                      <Input
                        placeholder='Zip'
                        value={this.state.zip}
                        onChange={this.setZip}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column style={{ paddingRight: '0px' }}>
                    <Form.Field required>
                      <label>Month</label>
                      <Dropdown
                        placeholder='Month'
                        fluid
                        compact
                        selection
                        labeled
                        label='Month'
                        onChange={this.handleMonthSelectionChange}
                        options={options.monthOptions}
                      />
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column style={{ padding: '0px' }}>
                    <Form.Field required>
                      <label>Day</label>
                      <Dropdown
                        placeholder='Day'
                        fluid
                        compact
                        selection
                        labeled
                        label='Day'
                        onChange={this.handleDateSelectionChange}
                        options={options.dateOptions}
                      />
                    </Form.Field>
                  </Grid.Column>

                  <Grid.Column style={{ paddingLeft: '0px' }}>
                    <Form.Field required>
                      <label>Year</label>
                      <Dropdown
                        placeholder='Year'
                        fluid
                        compact
                        selection
                        labeled
                        label='Year'
                        onChange={this.handleYearSelectionChange}
                        options={options.yearOptions}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <label>Meal</label>
                      <Button.Group size='large' basic>
                        <Button
                          onClick={() => { this.setState({ meal: 'Breakfast' }); } }
                          inverted
                          type='button'
                          >Breakfast
                        </Button>
                        <Button
                          onClick={() => { this.setState({ meal: 'Lunch' }); } }
                          type='button'
                          inverted
                          >Lunch
                        </Button>
                        <Button
                          onClick={() => { this.setState({ meal: 'Lunch' }); } }
                          type='button'
                          inverted
                          >Dinner
                        </Button>
                      </Button.Group>
                    </Form.Field>
                   </Grid.Column>
                </Grid.Row>
              </Grid>

              <Form.Field required>
                <label>Meal</label>
                <Dropdown
                  onChange={this.handlePartySizeSelectionChange}
                  placeholder="How many in your dining party?"
                  fluid
                  upward
                  selection
                  options={options.partySizeOptions}
                />
              </Form.Field>

              <Form.Field>
                <label>Cuisine</label>
                <Input placeholder='American Southern'
                  onChange={this.setCuisine}
                  value={this.state.cusine}
                />
              </Form.Field>

              <br/>

              <Form.Field required>
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
                <Link to='/userProfile'>
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
        </div>
      </div>
    );
  }
}


export default withRouter(CreateEventForm);
