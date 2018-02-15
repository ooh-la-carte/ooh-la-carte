import React, { Component } from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { Card, Image, Button, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { changeSelectedEvent, setUserInfo, setSocket, updateUserInfoByField, updateLastPrompted } from '../actions';
import '../style.scss';
import logo from '../../public/android-chrome-512x512.png';
import data from '../MockData';

const socketUrl = '/';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get('/api/user/info', { params: { id: window.localStorage.getItem('userId') } })
      .then((userInfo) => {
        const streetAddress = userInfo.data.street_name;
        const zipcode = userInfo.data.zip_code;
        const lastPrompt = userInfo.data.last_prompted;
        const { id, username, name, city, state, phone, rate } = userInfo.data;
        const { email, facebook, twitter, instagram } = userInfo.data;
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
        axios.get('/api/user/cuisines', { params: { id: window.localStorage.getItem('userId') } })
          .then((chefCuisines) => {
            chefCuisines.data.forEach((elem) => { cuisine[elem.cuisine] = true; });
          });
        const user = {
          id,
          name,
          username,
          streetAddress,
          city,
          state,
          zipcode,
          phone,
          email,
          rate,
          cuisine,
          facebook,
          twitter,
          instagram,
          lastPrompt,
        };
        this.props.setUserInfo(user);
      }).then(() => {
        if (this.needsToSeePrompt()) {
          const updateLastPromptObj = {
            field: 'last_prompted',
            updatedValue: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          };
          this.props.updateLastPrompted(updateLastPromptObj);
          console.log('new test', this.needsToSeePrompt());
          this.props.history.push('/addToHomescreen');
        }
      });

    // need an ter op here assigning the params object to diff between
    // retrieving a users created events, and a chefs attending events
    if (window.localStorage.getItem('isChef') === 'true') {
      axios.get('/api/events', { params: {
        field: 'chef_id', target: window.localStorage.getItem('userId'),
      } })
        .then((events) => {
          this.setState({ events: events.data });
        });
    } else {
      axios.get('/api/events', { params: {
        field: 'creator_id', target: window.localStorage.getItem('userId'),
      } })
        .then((events) => {
          this.setState({ events: events.data });
        });
    }
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket() {
    if (!this.props.socketReducer.id) {
      const socket = io(socketUrl);
      socket.on('connect', () => {
        this.props.setSocket(socket);
        console.log('Connected');
        socket.userId = window.localStorage.getItem('userId');
        socket.emit('add user', window.localStorage.getItem('username'));
      });
    }
  }

  needsToSeePrompt = (standalone) => {
    if (navigator.standalone || standalone) {
      return false;
    }
    const today = moment();
    const { lastPrompt } = this.props.user;
    const days = today.diff(lastPrompt, 'days'); // the number of days between now and the last prompt
    const isApple = ['iPhone', 'iPad', 'iPod'].includes(navigator.platform);
    return (Number.isNaN(days) || days > 14) && isApple;
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
  }

  render() {
    return (
      <div className='topLevelDiv'>
        <div className='center boxed'>
          <Grid>
            <Grid.Column verticalAlign='middle' width={5}>
              <Image size='small' id="logo" src={logo} alt='logo image' />
            </Grid.Column>
            <Grid.Column className='textColumn' verticalAlign='middle' width={11}>
              <Segment>
                <h4 className='center titleFont scriptFont'>Ooh La Carte</h4>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
        <Card className='profile userCard'>
          <Card.Content>
            <Image floated='right' size='tiny' src={data.chefs[0].image} />
            <Card.Header>
              {this.props.user.username}
            </Card.Header>
            <Card.Meta>
            {this.props.user.name}
            {this.props.user.city ?
              <div>{this.props.user.city}, {this.props.user.state}</div>
              : null }
            </Card.Meta>
            <Card.Description>
              <div>{data.chefs[0].description}</div>
            </Card.Description>
          </Card.Content>
          <Card.Content>
           <div className='center'><Link to='/settings'>Update User Settings</Link></div>
          </Card.Content>
        </Card>
        <h2 className='center'>Upcoming Events</h2>
        <div className='center miniPadding profile event'>
          {this.state.events.slice(0, 3).map(event => (
            <Card className='eventCard' key={event.id}
              onClick={() => {
                this.props.changeSelectedEvent(event);
                this.props.history.push('/selectedEvent');
              }}>
                <Card.Content>
                  <Card.Header>
                    <span className='center eventText'>{event.name}</span>
                  </Card.Header>
                  {event.city ?
                    <Card.Meta className='center'>
                    {`${event.city}, ${event.state}`}
                  </Card.Meta>
                  : null }
                </Card.Content>
              </Card>
          ))}
        {/* add a Link to a page for all of the user's upcoming events */}
        </div>
        <div className='center miniPadding profile event'>
        {/* add a Link to a page for all of the user's upcoming events */}
          <div className='btnDiv'>

          <Link to='/userEvents'>
            <Button className='btn' inverted>
              See All Your Events
            </Button>
          </Link>
          {!window.localStorage.getItem('isChef')
          ? <Link to='/createEvent'>
              <Button className='btn' type='submit' inverted>
                Create New Event
              </Button>
            </Link>
          : null }
        </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeSelectedEvent,
    setUserInfo,
    setSocket,
    updateUserInfoByField,
    updateLastPrompted,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.loggedInUserInfo,
    socketReducer: state.socketReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));
