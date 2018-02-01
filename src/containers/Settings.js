import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Icon, Grid, Checkbox, Form, Segment } from 'semantic-ui-react';
import '../style.scss';
import data from '../MockData';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
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

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    return (
      <div className='topLevelDiv'>
        <h1 className='center softText'>User Settings</h1>
        <div className='boxed center'>
          {/* ***** Cuisine Accordian ***** */}
          <div className='miniPadding'>
            <Accordion className='lightlyColored' fluid styled>
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
          </div>
          {/* ***** Rate Accordian ***** */}
          <div>
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
        </div>
        {/* ***** Add Menus ***** */}
        <h1 className='center miniPadding softText'>Add Menus</h1>
        {/* ***** Contact Info ***** */}
        <h1 className='center miniPadding softText'>Contact Info</h1>
        <div className='boxed center'>
          <Segment className='lightlyColored'>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>Name:</Grid.Column>
                <Grid.Column width={12}>{data.chefs[0].name}</Grid.Column>
                <Grid.Column width={4}>Address:</Grid.Column>
                <Grid.Column width={12}>{data.chefs[0].street_address}</Grid.Column>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={12}>{data.chefs[0].city_state_zip}</Grid.Column>
                <Grid.Column width={4}>Phone:</Grid.Column>
                <Grid.Column width={12}>{data.chefs[0].phone}</Grid.Column>
                <Grid.Column width={4}>Email:</Grid.Column>
                <Grid.Column width={12}>{data.chefs[0].email}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
        <div className='center miniPadding'><Link to='/contactInfo'>Update Contact Info</Link></div>
      </div>
    );
  }
}

export default Settings;
