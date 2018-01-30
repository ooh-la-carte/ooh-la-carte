import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Accordion, Icon, Dropdown, Button, Form, Radio } from 'semantic-ui-react';
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
      <Accordion fluid styled>
        <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          What is a dog?
        </Accordion.Title>
        <Accordion.Content active={this.state.activeIndex === 0}>
          <p>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            {' '}welcome guest in many households across the world.
          </p>
        </Accordion.Content>
      </Accordion>
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

        <Form.Group>
          <Form.Dropdown
            placeholder='Jan'
            fluid
            selection
          />
          <Form.Dropdown
            placeholder='1'
            fluid
            selection
          />
          <Form.Dropdown
            placeholder='2018'
            fluid
            selection
          />
        </Form.Group>

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
      </div>
    );
  }
}

export default Settings;
