import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Accordion, Icon, Grid, Checkbox, Form, Segment, Button } from 'semantic-ui-react';
import { setUserInfo, updateCuisineSelection, updateUserInfoByField, setMenu } from '../actions';
import MenuListItem from '../components/MenuListItem';
import { budgetOptions } from '../formOptions';
import Helpers from '../helpers';
import '../style.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: '',
      menu: [],
      menuOpen: false,
      id: window.localStorage.getItem('userId'),
      menu_name: '',
      type: '',
      price: '',
      description: '',
      pic: '',
      socialMediaSelected: '',
      showSocialMediaEntryField: false,
      socialMediaEntry: '',
      cuisineList: '',
    };
  }


  componentDidMount = () => {
    window.scrollTo(0, 0);
    axios.get('/api/user/menus', { params: { id: this.state.id } })
      .then((menuItems) => {
        this.props.setMenu(menuItems.data);
        // this.setState({ menu: menuItems.data });
      });
    this.setState({ cuisineList: Helpers.getCuisineList(this.props.user.cuisine) });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ cuisineList: Helpers.getCuisineList(nextProps.user.cuisine) });
  }

  setSocialMediaLink = (site) => {
    this.setState({
      socialMediaSelected: site,
      socialMediaEntry: this.props.user[site],
      showSocialMediaEntryField: true,
    });
  }

  updateSocialMedia = () => {
    const socialMediaInfo = {
      field: this.state.socialMediaSelected,
      updatedValue: this.state.socialMediaEntry,
    };
    this.props.updateUserInfoByField(socialMediaInfo);
    this.setState({ showSocialMediaEntryField: false });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  handleUpdate = (e, { type, value }) => this.setState({ [type]: value })

  saveMenuItem = () => {
    axios.post('/api/user/saveMenuItem', {
      chef_id: Number(this.state.id),
      menu_name: this.state.menu_name,
      pic: this.state.pic,
      description: this.state.description,
      cuisine_type: this.state.type,
    })
      .then(() => {
        this.setState({
          menu_name: '',
          pic: '',
          description: '',
          type: '',
        });
        axios.get('/api/user/menus', { params: { id: this.state.id } })
          .then((menuItems) => {
            this.props.setMenu(menuItems.data);
            // this.setState({ menu: menuItems.data });
          });
      });
  }

  openMenuForm = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleRateChange = (e, { value }) => {
    const rateInfo = {
      field: 'rate',
      updatedValue: value,
    };
    this.props.updateUserInfoByField(rateInfo);
  }

  handleCuisineSelection = (e, { value }) => {
    this.props.updateCuisineSelection(value);
  }

  render() {
    let socialMediaEntry;
    if (this.state.showSocialMediaEntryField) {
      socialMediaEntry = (
        <div>
          <Form className='center boxed'>
            <Form.Field>
              <label>Update your {this.state.socialMediaSelected} link:</label>
              <Form.Input
                action={<Button className='btn' inverted content='Save' type='button' onClick={this.updateSocialMedia} />}
                type='socialMediaEntry'
                placeholder={this.state.socialMediaEntry || `Enter your ${this.state.socialMediaSelected}...`}
                onChange={this.handleUpdate}
                value={this.state.socialMediaEntry || ''}
              />
            </Form.Field>
          </Form>
        </div>
      );
    }

    return (
      <div className='topLevelDiv'>
        <div className='boxed center'>
        {/* ***** Contact Info ***** */}
        <div className='miniPadding boxed center'>
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>Name:</Grid.Column>
                <Grid.Column width={12}>{this.props.user.name}</Grid.Column>
                <Grid.Column width={4}>Address:</Grid.Column>
                <Grid.Column width={12}>{this.props.user.streetAddress}</Grid.Column>
                <Grid.Column width={4}></Grid.Column>
                  <Grid.Column width={12}>
                    {
                      this.props.user.city
                      ?
                        `${this.props.user.city}, ${this.props.user.state}`
                      :
                        null
                    } {this.props.user.zipcode}
                  </Grid.Column>
                <Grid.Column width={4}>Phone:</Grid.Column>
                <Grid.Column width={12}>{this.props.user.phone}</Grid.Column>
                <Grid.Column width={4}>Email:</Grid.Column>
                <Grid.Column width={12}>{this.props.user.email}</Grid.Column>
              {window.localStorage.getItem('userId')
              ? <div className='boxed center'>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>Rate:</Grid.Column>
                <Grid.Column width={12}>{this.props.user.rate}</Grid.Column>
                <Grid.Column width={4}>Cuisines:</Grid.Column>
                <Grid.Column width={12}>{this.state.cuisineList}</Grid.Column>
              </Grid.Row>
            </Grid>
                </div>
              : null}
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
        <div className='center miniPadding'>
          <Link to='/contactInfo'>
            <Button className='btn' inverted> Update Contact Info</Button>
          </Link>
        </div>
      {/* ***** Cuisine Accordian ***** */}
      {window.localStorage.getItem('isChef')
        ?
        <div>
          <div className='miniPadding'>
            <Accordion fluid styled>
              <Accordion.Title index={0} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Cuisines
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 0}>
                <Grid>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox checked={this.props.user.cuisine.Asian} label='Asian' value='Asian' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.African} label='African' value='African' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Chinese} label='Chinese' value='Chinese' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.French} label='French' value='French' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Cajun} label='Cajun' value='Cajun' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox checked={this.props.user.cuisine.Indian} label='Indian' value='Indian' onChange={this.handleCuisineSelection}/>
                        <Form.Checkbox checked={this.props.user.cuisine.Italian} label='Italian' value='Italian' onChange={this.handleCuisineSelection}/>
                        <Form.Checkbox checked={this.props.user.cuisine.Southern} label='Southern' value='Southern' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Pastry} label='Pastry' value='Pastry' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Mexican} label='Mexican' value='Mexican' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Form>
                      <Form.Group grouped>
                        <Form.Checkbox checked={this.props.user.cuisine.BBQ} label='BBQ' value='BBQ' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Thai} label='Thai' value='Thai' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Vegan} label='Vegan' value='Vegan' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Vegetarian} label='Vegetarian' value='Vegetarian' onChange={this.handleCuisineSelection} />
                        <Form.Checkbox checked={this.props.user.cuisine.Seafood} label='Seafood' value='Seafood' onChange={this.handleCuisineSelection} />
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                </Grid>
              </Accordion.Content>
            </Accordion>
          </div>
          {/* ***** Rate Accordian ***** */}
          <div>
            <Accordion fluid styled>
              <Accordion.Title index={1} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Rate
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === 1}>
                <Form>
                  <Form.Group grouped>
                    {budgetOptions.map(option => (
                      <Form.Checkbox key={option.value}
                        checked={this.props.user.rate === option.text}
                        label={option.text} value={option.text}
                        onChange={this.handleRateChange} />
                    ))}
                  </Form.Group>
                </Form>
              </Accordion.Content>
            </Accordion>
          </div>
        </div>
      :
      null
      }
        {/* ***** Social Media Links ***** */}
        {socialMediaEntry}
      {window.localStorage.getItem('isChef') ?
      <div>
        <div className='center miniPadding'>
          {this.props.user.facebook ?
            <Icon name='facebook square' className='OLCcolor' size='huge' onClick={() => { this.setSocialMediaLink('facebook'); }}/>
            : <Icon name='facebook square' style={{ opacity: '0.2' }} color='grey' size='huge' onClick={() => { this.setSocialMediaLink('facebook'); }}/>
          }
          {this.props.user.twitter ?
            <Icon name='twitter' className='OLCcolor' size='huge' onClick={() => { this.setSocialMediaLink('twitter'); }}/>
            : <Icon name='twitter' style={{ opacity: '0.2' }} color='grey' size='huge' onClick={() => { this.setSocialMediaLink('twitter'); }}/>
          }
          {this.props.user.instagram ?
            <Icon name='instagram' className='OLCcolor' size='huge' onClick={() => { this.setSocialMediaLink('instagram'); }}/>
            : <Icon name='instagram' style={{ opacity: '0.2' }} color='grey' size='huge' onClick={() => { this.setSocialMediaLink('instagram'); }}/>
          }
        </div>
        {/* ***** Add Menus ***** */}
        <h1 className='center miniPadding softText'>Menus</h1>

       {/* ***** Menu List ***** */}
        <div>
          {this.props.menu.map(item => (
            <MenuListItem key={item.id} item={item} />
          ))}
        </div>
        <div className='cardHolder' style={{ margin: '3% 0%' }}>
          <Button className='btn' inverted
          onClick={this.openMenuForm}>Add a new menu</Button>
        </div>
        {this.state.menuOpen
          ?
            <Segment className='standardWidth'>
              <Form className='boxed center' onSubmit={() => {
                this.openMenuForm();
                this.saveMenuItem();
              }}>
                  <Form.Field>
                    <label>Menu name</label>
                    <Form.Input placeholder='Menu name' onChange={this.handleUpdate} type='menu_name' value={this.state.menu_name}/>
                  </Form.Field>
                  <Form.Field style={{ width: '50%' }}>
                    <label>Cuisine / Theme</label>
                    <Form.Input placeholder='Cuisine / Theme' onChange={this.handleUpdate} type='type' value={this.state.type}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Description</label>
                    <Form.Input placeholder='Description' onChange={this.handleUpdate} type='description' value={this.state.description}/>
                  </Form.Field>
                  <Form.Field>
                    <label>Picture</label>
                    <Form.Input placeholder='picture URL' onChange={this.handleUpdate} type='pic' value={this.state.pic}/>
                  </Form.Field>
                  <div className='btnDiv'>
                    <Button className='btn' inverted type='submit'>Save</Button><Button className='btn' inverted onClick={this.openMenuForm}>Cancel</Button>
                  </div>
                </Form>
            </Segment>
          : null
        }
        <br /> <br />
      </div>
    : null
    }
      </div>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserInfo,
    updateCuisineSelection,
    updateUserInfoByField,
    setMenu,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.loggedInUserInfo,
    menu: state.menuReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings));
