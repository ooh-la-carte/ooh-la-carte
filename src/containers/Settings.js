import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Accordion, Icon, Grid, Checkbox, Form, Segment, Button } from 'semantic-ui-react';
import { setUserInfo, updateCuisineSelection, updateUserInfoByField } from '../actions';
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
      menuName: '',
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
        this.setState({ menu: menuItems.data });
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
      menuName: this.state.menuName,
      pic: this.state.pic,
      description: this.state.description,
      cuisine_type: this.state.type,
    })
      .then(() => this.setState({
        menu: [...this.state.menu, {
          id: 7777,
          chef_id: Number(this.state.id),
          menuName: this.state.menuName,
          pic: this.state.pic,
          description: this.state.description,
          cuisine_type: this.state.type,
        }],
        menuName: '',
        pic: '',
        description: '',
        type: '',
      }));
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
                action={<Button className='butPri' inverted content='Save' type='button' onClick={this.updateSocialMedia} />}
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
                  <Checkbox checked={this.props.user.cuisine.custom} label='Custom' />
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
                    {budgetOptions.map(option => (
                      <Form.Checkbox key={option.value}
                        checked={this.props.user.rate === option.value}
                        label={option.text} value={option.text}
                        onChange={this.handleRateChange} />
                    ))}
                  </Form.Group>
                </Form>
              </Accordion.Content>
            </Accordion>
          </div>
        </div>
        {/* ***** Contact Info ***** */}
        <div className='miniPadding boxed center'>
          <Segment className='lightlyColored'>
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
                <Grid.Column width={4}>Rate:</Grid.Column>
                <Grid.Column width={12}>{this.props.user.rate}</Grid.Column>
                <Grid.Column width={4}>Cuisines:</Grid.Column>
                <Grid.Column width={12}>{this.state.cuisineList}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
        {/* ***** Social Media Links ***** */}
        {socialMediaEntry}
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
        <div className='center miniPadding'><Link to='/contactInfo'>Update Contact Info</Link></div>
        {/* ***** Add Menus ***** */}
        <h1 className='center miniPadding softText'>Add Menus</h1>
        <h5 className='center miniPadding softText'
        onClick={this.openMenuForm}>Add a menu item!</h5>
        {this.state.menuOpen
          ?
            <Form className='boxed center' onSubmit={() => {
              this.openMenuForm();
              this.saveMenuItem();
            }}>
                <Form.Field>
                  <label>Menu name</label>
                  <Form.Input placeholder='Menu name' onChange={this.handleUpdate} type='menuName' value={this.state.menuName}/>
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
                  <Form.Input placeholder='picture URL' onChange={this.handleUpdate} type='picture' value={this.state.picture}/>
                </Form.Field>
                <Button type='submit'>Save!</Button>
              </Form>
          : null
        }

       {/* ***** Menu List ***** */}
        <div>
          {this.state.menu.map(item => (
            <MenuListItem key={item.id} item={item} />
          ))}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserInfo,
    updateCuisineSelection,
    updateUserInfoByField,
  }, dispatch);
}

function mapStateToProps(state) {
  return { user: state.loggedInUserInfo };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings));
