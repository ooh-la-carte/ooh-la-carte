import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Accordion, Icon, Grid, Checkbox, Form, Segment } from 'semantic-ui-react';
import '../style.scss';

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
      user: {
        name: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        email: '',
      },
      id: window.localStorage.getItem('userId'),
    };
  }

  componentDidMount() {
    axios.get('/api/user/info', { params: { id: this.state.id } })
      .then((userInfo) => {
        const streetAddress = userInfo.data.street_name;
        const zipcode = userInfo.data.zip_code;
        const { name, city, state, phone, email } = userInfo.data;
        this.setState({ user:
          {
            name, streetAddress, city, state, zipcode, phone, email,
          } });
      });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  handleCuisineSelection = (e, { value }) => {
    this.setState({ cuisine:
    Object.assign(this.state.cuisine, { [value]: !this.state.cuisine[value] }) });
    const cuisineString = [];
    Object.keys(this.state.cuisine).map((keyName) => {
      if (this.state.cuisine[keyName]) {
        cuisineString.push(1);
      } else {
        cuisineString.push(0);
      }
      return 1;
    });
    console.log(cuisineString);
    const eventObj = {
      id: this.state.id,
      cuisine: JSON.stringify(cuisineString),
    };
    const url = '/api/updateCuisineSelection';
    axios.post(url, eventObj)
      .then(() => {
        console.log('Cuisine added');
      });
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
                        <Form.Checkbox defaultChecked={this.state.cuisine.Vietnamese} label='Vietnamese' value='Vietnamese' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox defaultChecked={this.state.cuisine.Chinese} label='Chinese' value='Chinese' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox defaultChecked={this.state.cuisine.French} label='French' value='French' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox defaultChecked={this.state.cuisine.Sushi} label='Sushi' value='Sushi' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox defaultChecked={this.state.cuisine.Vegetarian} label='Vegetarian' value='Vegetarian' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox defaultChecked={this.state.cuisine.BBQ} label='BBQ' value='BBQ' onChange={this.handleCuisineSelection}/>
                        <Form.Checkbox defaultChecked={this.state.cuisine.Pastry} label='Pastry' value='Pastry' onChange={this.handleCuisineSelection}/>
                        <Form.Checkbox defaultChecked={this.state.cuisine.Indian} label='Indian' value='Indian' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox defaultChecked={this.state.cuisine.Thai} label='Thai' value='Thai' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox defaultChecked={this.state.cuisine.Cajun} label='Cajun' value='Cajun' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox defaultChecked={this.state.cuisine.Mexican} label='Mexican' value='Mexican' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox defaultChecked={this.state.cuisine.Italian} label='Italian' value='Italian' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox defaultChecked={this.state.cuisine.Sothern} label='Southern' value='Southern' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox defaultChecked={this.state.cuisine.Greek} label='Greek' value='Greek' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox defaultChecked={this.state.cuisine.Vegan} label='Vegan' value='Vegan' onChange={this.handleCuisineSelection} />
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
                <Grid.Column width={12}>{this.state.user.name}</Grid.Column>
                <Grid.Column width={4}>Address:</Grid.Column>
                <Grid.Column width={12}>{this.state.user.streetAddress}</Grid.Column>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={12}>
                  {this.state.user.city}, {this.state.user.state} {this.state.user.zipcode}
                  </Grid.Column>
                <Grid.Column width={4}>Phone:</Grid.Column>
                <Grid.Column width={12}>{this.state.user.phone}</Grid.Column>
                <Grid.Column width={4}>Email:</Grid.Column>
                <Grid.Column width={12}>{this.state.user.email}</Grid.Column>
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
