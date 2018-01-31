import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Accordion, Icon, Dropdown, Grid, Checkbox, Button, Form, Radio } from 'semantic-ui-react';
import '../style.scss';


const axios = require('axios');

const styles = {
  btnDiv: {
    display: 'flex',
    justifyContent: 'space-around',
  },
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
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

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
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
      <div className='topLevelDiv'>
      <h1 className='center softText'>User Settings</h1>
      <div className='boxed center'>
      {/* Cuisine Accordian */}
      <Accordion exclusive={false} className='lightlyColored' fluid styled>
        <Accordion.Title index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Cuisines
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 0}>
          <Grid>
            <Grid.Column width={5}>
              <Form>
                <Form.Group grouped>
                  <Form.Checkbox label='Vietnamese' value='Vietnamese' />
                  <Form.Checkbox label='Chinese' value='Chinese' />
                  <Form.Checkbox label='French' value='French' />
                  <Form.Checkbox label='Sushi' value='Sushi'/>
                  <Form.Checkbox label='Vegetarian' value='Vegetarian'/>
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column width={5}>
              <Form>
                <Form.Group grouped>
                  <Form.Checkbox label='BBQ' value='BBQ' />
                  <Form.Checkbox label='Pastry' value='Pastry' />
                  <Form.Checkbox label='Indian' value='Indian' />
                  <Form.Checkbox label='Thai' value='Thai'/>
                  <Form.Checkbox label='Cajun' value='Cajun'/>
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column width={5}>
              <Form>
                <Form.Group grouped>
                  <Form.Checkbox label='Mexican' value='Mexican' />
                  <Form.Checkbox label='Italian' value='Italian' />
                  <Form.Checkbox label='Southern' value='French' />
                  <Form.Checkbox label='Greek' value='Greek'/>
                  <Form.Checkbox label='Vegan' value='Vegan'/>
                </Form.Group>
              </Form>
            </Grid.Column>
            <Checkbox label='Custom' />
            <Form.Field>
            <input
              placeholder='Description...'
              value={this.state.custom}
              onChange={true}
            />
          </Form.Field>
          </Grid>
        </Accordion.Content>
      </Accordion>
      {/* Rate Accordian */}
      <Accordion className='lightlyColored' fluid styled>
        <Accordion.Title index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Rate
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 1}>
          <Form>
            <Form.Group grouped>
              <Form.Checkbox label='Budget' value='1' />
              <Form.Checkbox label='Moderate' value='2' />
              <Form.Checkbox label='High' value='3' />
              <Form.Checkbox label='Luxury' value='4'/>
              <Form.Checkbox label='Custom' value='5'/>
            </Form.Group>
          </Form>
        </Accordion.Content>
      </Accordion>
      </div>
      <Form>
        {this.state.submitted === true ? <Redirect to="/events" /> : ''}

        <h1>Cost</h1>
        <Form.Field>
          <input
            placeholder='Austin, TX'
            value={this.state.date}
            onChange={true}
          />
        </Form.Field>

        <h1>Availability</h1>
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
      </div>
    );
  }
}

export default Settings;
