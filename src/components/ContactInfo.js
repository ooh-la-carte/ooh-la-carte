import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Grid, Input, Dropdown, Label } from 'semantic-ui-react';
import { setUserInfo, updateCuisineSelection } from '../actions';
import '../style.scss';
import options from '../formOptions';

class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstOAuth: false,
      username: null,
      isChef: null,
      id: window.localStorage.getItem('userId'),
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      email: '',
      twitter: '',
      facebook: '',
      instagram: '',
      bio: '',
      experience: '',
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    axios.get('/api/user/info', { params: { id: this.state.id } })
      .then((userInfo) => {
        const streetAddress = userInfo.data.street_name;
        const zipcode = userInfo.data.zip_code;
        const isChef = userInfo.data.is_chef;
        const { username } = userInfo.data;
        const { name, city, state, phone, email, twitter, facebook, instagram } = userInfo.data;
        const cuisine = {
          Asian: false,
          African: false,
          Cajun: false,
          Chinese: false,
          French: false,
          Indian: false,
          Italian: false,
          Pastry: false,
          Mexican: false,
          Seafood: false,
          BBQ: false,
          Thai: false,
          Southern: false,
          Vegetarian: false,
          Vegan: false,
          Custom: false,
        };
        const update = {
          username,
          isChef,
          name,
          streetAddress,
          city,
          state,
          zipcode,
          phone,
          email,
          cuisine,
          twitter,
          facebook,
          instagram,
        };

        if (isChef === null) {
          update.firstOAuth = true;
        }
        this.setState(update);
      });
  }

  handleUpdate = (e, { type, value }) => {
    this.setState({ [type]: value });
  }

  handleSubmit = () => {
    const eventObj = this.state;
    this.props.setUserInfo(eventObj);
    const url = '/api/updateContactInfo';
    // if (eventObj.name && eventObj.phone && eventObj.email &&
    //   (!eventObj.firstOAuth || (eventObj.username && eventObj.isChef))) {
    if (eventObj.firstOAuth) {
      if (!eventObj.isChef) {
        document.getElementById('accountTypeRequiredNotifier').classList.remove('hidden');
        const bubble = document.querySelector('#accountTypeRequiredNotifier');
        const rect = bubble.getBoundingClientRect();
        window.scroll(0, rect.top);
      } else if (!eventObj.username) {
        document.getElementById('usernameRequiredNotifier').classList.remove('hidden');
        const bubble = document.querySelector('#usernameRequiredNotifier');
        const rect = bubble.getBoundingClientRect();
        window.scroll(0, rect.top);
      }
    }
    if (!eventObj.name) {
      document.getElementById('nameRequiredNotifier').classList.remove('hidden');
      const bubble = document.querySelector('#nameRequiredNotifier');
      const rect = bubble.getBoundingClientRect();
      window.scroll(0, rect.top);
    } else if (!(eventObj.city && eventObj.state && eventObj.zipcode)) {
      document.getElementById('locationRequiredNotifier').classList.remove('hidden');
      const bubble = document.querySelector('#locationRequiredNotifier');
      const rect = bubble.getBoundingClientRect();
      window.scroll(0, rect.top);
    } else if (!eventObj.email) {
      document.getElementById('emailRequiredNotifier').classList.remove('hidden');
      const bubble = document.querySelector('#emailRequiredNotifier');
      const rect = bubble.getBoundingClientRect();
      window.scroll(0, rect.top);
    } else {
      console.log('it never got here');
      axios.post(url, eventObj)
        .then((response) => {
          if (response.status === 200) {
            // can maybe add a first time property to user
            // that tracks the first time they fill this out and redirects that time only
            window.localStorage.username = eventObj.username;
            window.localStorage.isChef = eventObj.isChef;
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
        <Form onSubmit={this.handleSubmit} className='boxed center'>
          <div className={this.state.firstOAuth ? '' : 'hidden'}>
            <Form.Field required>
              <label>Account Type</label>
              <Dropdown
                type='isChef'
                onChange={this.handleUpdate}
                placeholder="Will this be a client or chef account?"
                fluid
                selection
                options={options.userOptions}
                onClick={() => { document.getElementById('accountTypeRequiredNotifier').classList.add('hidden'); } }
              />
            </Form.Field>
          </div>

          <div id="accountTypeRequiredNotifier" className="hidden">
            <Label basic color='red' pointing>Please select an account type</Label>
          </div>

          <div className={this.state.firstOAuth ? '' : 'hidden'}>
            <Form.Field required>
              <label>Username</label>
              <Input
                type='username'
                placeholder='This will be your display name and your username'
                onChange={this.handleUpdate}
                onFocus={() => { document.getElementById('usernameRequiredNotifier').classList.add('hidden'); } }
              />
            </Form.Field>
          </div>

          <div id="usernameRequiredNotifier" className="hidden">
            <Label basic color='red' pointing>Please enter a username</Label>
          </div>

          <Form.Field required>
            <label>Name</label>
            <Form.Input
              type='name'
              placeholder={this.state.name || 'Name'}
              onChange={this.handleUpdate}
              value={this.state.name || ''}
              onFocus={() => { document.getElementById('nameRequiredNotifier').classList.add('hidden'); } }
            />
          </Form.Field>

          <div id="nameRequiredNotifier" className="hidden">
            <Label basic color='red' pointing>Please enter a name</Label>
          </div>

          <Form.Field>
            <label>Bio</label>
            <Form.Input
              type='bio'
              placeholder={this.state.bio || 'Tell us about yourself...'}
              onChange={this.handleUpdate}
              value={this.state.bio || ''}
            />
          </Form.Field>
          <Form.Field required>
            <label>Address</label>
              <Form.Group>
                <Form.Input
                  placeholder={this.state.streetAddress || 'Street Address'}
                  type='streetAddress'
                  onChange={this.handleUpdate}
                  value={this.state.streetAddress || ''}
                  width={4}
                />
              </Form.Group>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column style={{ paddingRight: '0px' }} width={8}>
                    <Form.Field required>
                      <Input
                        placeholder={this.state.city || 'City'}
                        type='city'
                        value={this.state.city || ''}
                        onChange={this.handleUpdate}
                        onFocus={() => { document.getElementById('locationRequiredNotifier').classList.add('hidden'); } }

                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column style={{ padding: '0px' }} width={3}>
                    <Form.Field required>
                      <Input
                        placeholder={this.state.state || 'State'}
                        type='state'
                        value={this.state.state || ''}
                        onChange={this.handleUpdate}
                        onFocus={() => { document.getElementById('locationRequiredNotifier').classList.add('hidden'); } }
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column style={{ paddingLeft: '0px' }} width={5}>
                    <Form.Field required>
                      <Input
                        placeholder={this.state.zipcode || 'Zipcode'}
                        type='zipcode'
                        value={this.state.zipcode || ''}
                        onChange={this.handleUpdate}
                        onFocus={() => { document.getElementById('locationRequiredNotifier').classList.add('hidden'); } }
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                </Grid>
          </Form.Field>

          <div id="locationRequiredNotifier" className="hidden">
            <Label basic color='red' pointing>Please enter a city, state, and zip</Label>
          </div>

          <Form.Field >
          <label>Phone</label>
            <Form.Input
              type='phone'
              placeholder={this.state.phone || 'Phone'}
              onChange={this.handleUpdate}
              value={this.state.phone || ''}
            />
          </Form.Field>
          <Form.Field required>
          <label>Email</label>
            <Form.Input
              type='email'
              placeholder={this.state.email || 'Email'}
              onChange={this.handleUpdate}
              value={this.state.email || ''}
              onFocus={() => { document.getElementById('emailRequiredNotifier').classList.add('hidden'); } }
            />
          </Form.Field>

          <div id="emailRequiredNotifier" className="hidden">
            <Label basic color='red' pointing>Please enter an email address</Label>
          </div>

          <Form.Field>
          <label>Facebook Link</label>
            <Form.Input
              type='facebook'
              placeholder={this.state.facebook || 'Facebook URL'}
              onChange={this.handleUpdate}
              value={this.state.facebook || ''}
            />
          </Form.Field>
          <Form.Field>
          <label>Twitter Link</label>
            <Form.Input
              type='twitter'
              placeholder={this.state.twitter || 'Twitter URL'}
              onChange={this.handleUpdate}
              value={this.state.twitter || ''}
            />
          </Form.Field>
          <Form.Field>
          <label>Instagram Link</label>
            <Form.Input
              type='instagram'
              placeholder={this.state.instagram || 'Instagram URL'}
              onChange={this.handleUpdate}
              value={this.state.instagram || ''}
            />
          </Form.Field>

          <div className='btnDiv'>
          <Link to='/settings'>
            <Button
              className='btn'
              inverted
            > Cancel
            </Button>
          </Link>
          <Button
            className='btn'
            type='submit'
            inverted
          >
            Submit
          </Button>
          </div>
        </Form>
        <br />  <br /> <br />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserInfo,
    updateCuisineSelection,
  }, dispatch);
}

function mapStateToProps(state) {
  return { user: state.loggedInUserInfo };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactInfo));
