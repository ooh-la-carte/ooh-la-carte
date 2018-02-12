import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Dropdown, Button, Form, Input, TextArea, Grid } from 'semantic-ui-react';
import { selectConversation, updateEventRating } from '../actions';
import '../style.scss';

import options from '../formOptions';

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
      name: '',
      eventId: null,
      hostId: window.localStorage.getItem('userId'),
      hostUsername: window.localStorage.getItem('username'),
      chefID: '',
      city: '',
      state: '',
      zip: '',
      month: '',
      date: '',
      year: '',
      cuisine: '',
      description: '',
      budget: '',
      partySize: '',
      meal: '', // breakfast, brunch, lunch, dinner
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (window.location.pathname.split('/')[1] === 'editEvent') {
      const date = new Date(this.props.event.date_time);
      this.setState({
        name: this.props.event.name || '',
        eventId: this.props.event.id || null,
        hostId: window.localStorage.getItem('userId'),
        hostUsername: window.localStorage.getItem('username'),
        chefID: this.props.event.chef_id || '',
        city: this.props.event.city || '',
        state: this.props.event.state || '',
        zip: this.props.event.zip_code || '',
        month: options.monthOptions[date.getMonth()].value || '',
        date: date.getDate() || '',
        year: date.getFullYear() || '',
        cuisine: this.props.event.cuisine_type || '',
        description: this.props.event.description || '',
        budget: this.props.event.budget || '',
        partySize: this.props.event.party_size || '',
        meal: this.props.event.meal_type || '', // breakfast, brunch, lunch, dinner
      });
    }
  }

  handleUpdate = (e, { type, value }) => {
    this.setState({ [type]: value });
  }

  setSubmitted = () => { this.setState({ submitted: true }); }

  handleSubmit = () => {
    const eventObj = this.state;
    let url = '';
    if (window.location.pathname.split('/')[1] === 'editEvent') {
      url = '/api/editEvent';
    } else {
      url = '/api/createevent';
    }
    if (!eventObj.date || !eventObj.partySize || !eventObj.budget ||
        !eventObj.name || !eventObj.zip) {
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
        <div className='boxed center'>
          <div>
            <Form onSubmit={this.handleSubmit}>

              <Form.Field required>
                <label>Event Name</label>
                <Input placeholder='Event Title' type='name' onChange={this.handleUpdate} value={this.state.name} />
              </Form.Field>

              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column style={{ paddingRight: '0px' }} width={8}>
                    <Form.Field>
                      <label>City</label>
                      <Input placeholder='City' value={this.state.city} type='city' onChange={this.handleUpdate} />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column style={{ padding: '0px' }} width={3}>
                    <Form.Field>
                      <label>State</label>
                      <Input placeholder='State' value={this.state.state} type='state' onChange={this.handleUpdate} />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column style={{ paddingLeft: '0px' }} width={5}>
                    <Form.Field required>
                      <label>Zip</label>
                      <Input placeholder='Zipcode' value={this.state.zip} type='zip' onChange={this.handleUpdate} />
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
                        selection
                        label='Month' type='month'
                        value={this.state.month}
                        onChange={this.handleUpdate}
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
                        selection
                        label='Day' type='date'
                        value={this.state.date}
                        onChange={this.handleUpdate}
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
                        selection
                        label='Year' type='year'
                        value={this.state.year}
                        onChange={this.handleUpdate}
                        options={options.yearOptions}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <div className='miniPadding'>
              <Form.Field required>
                <label>Party Size</label>
                <Dropdown
                  placeholder="Party Size"
                  fluid upward selection
                  value={this.state.partySize} type='partySize'
                  onChange={this.handleUpdate}
                  options={options.partySizeOptions}
                />
              </Form.Field>
              </div>
              <div className='miniPadding center'>
                <Button.Group size='medium' className='center butPri'>
                  <Button
                    onClick={() => { this.setState({ meal: 'breakfast' }); } }
                    inverted
                    type='button'
                    active={this.state.meal === 'breakfast' }
                    >Breakfast
                  </Button>
                  <Button
                    onClick={() => { this.setState({ meal: 'lunch' }); } }
                    type='button'
                    active={this.state.meal === 'lunch' }
                    inverted
                    >Lunch
                  </Button>
                  <Button
                    onClick={() => { this.setState({ meal: 'dinner' }); } }
                    type='button'
                    active={this.state.meal === 'dinner' }
                    inverted
                    >Dinner
                  </Button>
                </Button.Group>
              </div>

              <Form.Field>
                <label>Cuisine</label>
                <Input placeholder='Cuisine Description' type='cuisine' onChange={this.handleUpdate} value={this.state.cuisine} />
              </Form.Field>

              <br/>

              <Form.Field required>
                <label>Budget</label>
                <Input placeholder='Budget'
                  onChange={this.handleUpdate}
                  value={`${this.state.budget}`}
                  type='budget'
                />
              </Form.Field>


              <Form.Field>
              <label>Description</label>
                <TextArea
                autoHeight
                placeholder='Add any additional relevent information...'
                rows={2}
                onChange={this.handleUpdate}
                value={this.state.description}
                type='description'
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
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { event: state.selectedEventReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectConversation,
    updateEventRating,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateEventForm));

