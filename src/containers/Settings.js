import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Accordion, Icon, Grid, Checkbox, Form, Segment } from 'semantic-ui-react';
import '../style.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        rate: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        email: '',
        cuisine: {
          asian: false,
          african: false,
          cajun: false,
          chinese: false,
          french: false,
          indian: false,
          italian: false,
          pastry: false,
          texmex: false,
          middleEastern: false,
          bbq: false,
          thai: false,
          southern: false,
          vegetarian: false,
          vegan: false,
          custom: false,
        },
      },
      id: window.localStorage.getItem('userId'),
    };
  }


  componentDidMount() {
    window.scrollTo(0, 0);
    const cuisine = {
      asian: false,
      african: false,
      cajun: false,
      chinese: false,
      french: false,
      indian: false,
      italian: false,
      pastry: false,
      texmex: false,
      middleEastern: false,
      bbq: false,
      thai: false,
      southern: false,
      vegetarian: false,
      vegan: false,
      custom: false,
    };
    axios.get('/api/user/info', { params: { id: this.state.id } })
      .then((userInfo) => {
        const streetAddress = userInfo.data.street_name;
        const zipcode = userInfo.data.zip_code;
        const { name, city, state, phone, email, rate } = userInfo.data;
        this.setState({ user:
            {
              name,
              streetAddress,
              city,
              state,
              zipcode,
              phone,
              email,
              rate,
              cuisine,
            } });
      });
    axios.get('/api/user/cuisines', { params: { id: this.state.id } })
      .then((cuisines) => {
        cuisines.data.forEach((el) => {
          this.setState(Object.assign(this.state, { user:
            Object.assign(this.state.user, { cuisine:
              Object.assign(this.state.user.cuisine, { [el.cuisine]: true }) }) }));
        });
      });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  handleRateChange = (e, { value }) => {
    this.setState(Object.assign(this.state, { user:
      Object.assign(this.state.user, { rate: value }) }));
    const eventObj = {
      id: this.state.id,
      rate: this.state.user.rate,
    };
    const url = '/api/updateChefRate';
    axios.post(url, eventObj);
  }

  handleCuisineSelection = (e, { value }) => {
    this.setState(Object.assign(this.state, { user:
      Object.assign(this.state.user, { cuisine:
        Object.assign(this.state.user.cuisine, { [value]: !this.state.user.cuisine[value] }) }) }));
    const eventObj = {
      id: this.state.id,
      cuisine: value,
      description: '',
    };
    if (this.state.user.cuisine[value]) {
      const url = '/api/user/cuisines';
      axios.post(url, eventObj);
    } else {
      const url = '/api/user/deleteCuisines';
      axios.post(url, eventObj);
    }
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
                        <Form.Checkbox checked={this.state.user.cuisine.asian} label='Asian' value='asian' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.state.user.cuisine.african} label='African' value='african' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.state.user.cuisine.chinese} label='Chinese' value='chinese' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.state.user.cuisine.french} label='French' value='french' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.state.user.cuisine.cajun} label='Cajun/ Creole' value='cajun' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox checked={this.state.user.cuisine.indian} label='Indian' value='indian' onChange={this.handleCuisineSelection}/>
                        <Form.Checkbox checked={this.state.user.cuisine.italian} label='Italian' value='italian' onChange={this.handleCuisineSelection}/>
                        <Form.Checkbox checked={this.state.user.cuisine.southern} label='Southern' value='southern' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.state.user.cuisine.pastry} label='Pastry' value='pastry' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.state.user.cuisine.middleEastern} label='Middle Eastern' value='middleEastern' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox checked={this.state.user.cuisine.bbq} label='BBQ' value='bbq' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.state.user.cuisine.thai} label='Thai' value='thai' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.state.user.cuisine.vegan} label='Vegan' value='vegan' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.state.user.cuisine.vegetarian} label='Vegetarian' value='vegetarian' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.state.user.cuisine.texmex} label='Tex-Mex' value='texmex' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Checkbox checked={this.state.user.cuisine.custom} label='Custom' />
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
                    <Form.Checkbox checked={this.state.user.rate === '1'} label='Budget' value='1' onChange={this.handleRateChange} />
                    <Form.Checkbox checked={this.state.user.rate === '2'} label='Moderate' value='2' onChange={this.handleRateChange} />
                    <Form.Checkbox checked={this.state.user.rate === '3'} label='High' value='3' onChange={this.handleRateChange} />
                    <Form.Checkbox checked={this.state.user.rate === '4'} label='Luxury' value='4'onChange={this.handleRateChange} />
                    <Form.Checkbox checked={this.state.user.rate === '5'} label='Custom' value='5'onChange={this.handleRateChange} />
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
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Settings;
