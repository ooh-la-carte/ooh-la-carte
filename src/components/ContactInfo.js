import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Grid, Input } from 'semantic-ui-react';
import { setUserInfo, updateCuisineSelection } from '../actions';
import '../style.scss';

class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
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
        this.setState({
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
        });
      });
  }

  handleUpdate = (e, { type, value }) => {
    this.setState({ [type]: value });
  }

  handleSubmit = () => {
    const eventObj = this.state;
    this.props.setUserInfo(eventObj);
    const url = '/api/updateContactInfo';
    if (eventObj.name && eventObj.phone && eventObj.email) {
      axios.post(url, eventObj)
        .then((response) => {
          if (response.status === 200) {
            // can maybe add a first time property to user
            // that tracks the first time they fill this out and redirects that time only
            this.props.history.push('/userProfile');
          }
        })
        .catch((error) => {
          console.log('submission error: ', error);
        });
    } else {
      this.setState({ error: true }, () => { window.scrollTo(0, document.body.scrollHeight); });
    }
  }

  render() {
    return (
      <div className='topLevelDiv'>
        <Form onSubmit={this.handleSubmit} className='boxed center'>
          <Form.Field required>
            <label>Name</label>
            <Form.Input
              type='name'
              placeholder={this.state.name || 'Name'}
              onChange={this.handleUpdate}
              value={this.state.name || ''}
            />
          </Form.Field>
          <Form.Field>
            <label>Bio</label>
            <Form.Input
              type='bio'
              placeholder={this.state.bio || 'Tell us about yourself...'}
              onChange={this.handleUpdate}
              value={this.state.bio || ''}
            />
          </Form.Field>
          <Form.Field>
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
                    <Form.Field>
                      <Input
                        placeholder={this.state.city || 'City'}
                        type='city'
                        value={this.state.city || ''}
                        onChange={this.handleUpdate}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column style={{ padding: '0px' }} width={3}>
                    <Form.Field>
                      <Input
                        placeholder={this.state.state || 'State'}
                        type='state'
                        value={this.state.state || ''}
                        onChange={this.handleUpdate}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column style={{ paddingLeft: '0px' }} width={5}>
                    <Form.Field>
                      <Input
                        placeholder={this.state.zipcode || 'Zipcode'}
                        type='zipcode'
                        value={this.state.zipcode || ''}
                        onChange={this.handleUpdate}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                </Grid>

          </Form.Field>
          <Form.Field required>
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
            />
          </Form.Field>
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
          {this.state.error
            ? <div className='center miniPadding' style={{ color: 'red' }}>* Please complete all required fields</div>
            : null
          }
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
