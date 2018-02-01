import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Icon, Grid, Checkbox, Form, Segment } from 'semantic-ui-react';
import '../style.scss';
import data from '../MockData';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisine: {
        Vietnamese: false,
        Chinese: false,
        French: false,
        Sushi: false,
        Vegetarian: false,
        BBQ: false,
        Pastry: false,
        Indian: false,
        Thai: false,
        Cajun: false,
        Mexican: false,
        Italian: false,
        Southern: false,
        Greek: false,
        Vegan: false,
      },
      submitted: false,
      hostId: window.localStorage.userID,
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  handleChange = (e, { value }) => {
    this.setState({ cuisine:
    Object.assign(this.state.cuisine, { [value]: !this.state.cuisine[value] }) });
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
                        <Form.Checkbox label='Vietnamese' value='Vietnamese' onChange={this.handleChange} />
                        <Form.Checkbox label='Chinese' value='Chinese' onChange={this.handleChange} />
                        <Form.Checkbox label='French' value='French' onChange={this.handleChange} />
                        <Form.Checkbox label='Sushi' value='Sushi' onChange={this.handleChange} />
                        <Form.Checkbox label='Vegetarian' value='Vegetarian' onChange={this.handleChange} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox label='BBQ' value='BBQ' onChange={this.handleChange}/>
                        <Form.Checkbox label='Pastry' value='Pastry' onChange={this.handleChange}/>
                        <Form.Checkbox label='Indian' value='Indian' onChange={this.handleChange} />
                        <Form.Checkbox label='Thai' value='Thai' onChange={this.handleChange} />
                        <Form.Checkbox label='Cajun' value='Cajun' onChange={this.handleChange} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox label='Mexican' value='Mexican' onChange={this.handleChange} />
                        <Form.Checkbox label='Italian' value='Italian' onChange={this.handleChange} />
                        <Form.Checkbox label='Southern' value='Southern' onChange={this.handleChange} />
                        <Form.Checkbox label='Greek' value='Greek' onChange={this.handleChange} />
                        <Form.Checkbox label='Vegan' value='Vegan' onChange={this.handleChange} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Checkbox label='Custom' />
                  <Form.Field>
                    <input
                      placeholder='Description...'
                      value={this.state.custom}
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
