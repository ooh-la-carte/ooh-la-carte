import React, { Component } from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { Card, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { changeSelectedEvent, setUserInfo, setSocket } from '../actions';
import '../style.scss';
import data from '../MockData';

const socketUrl = '/';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/user/info', { params: { id: window.localStorage.getItem('userId') } })
      .then((userInfo) => {
        const streetAddress = userInfo.data.street_name;
        const zipcode = userInfo.data.zip_code;
        const { id, name, city, state, phone, email, rate } = userInfo.data;
        let { cuisine } = userInfo.data;
        if (!cuisine) {
          cuisine = {
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
          };
        } else {
          cuisine = JSON.parse(cuisine);
        }
        const user = {
          id,
          name,
          streetAddress,
          city,
          state,
          zipcode,
          phone,
          email,
          rate,
          cuisine,
        };
        this.props.setUserInfo(user);
      });
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

  handleChange = (e, { value }) => {
    this.setState({ value });
  }

  render() {
    return (
      <div className='topLevelDiv'>
        <Card key={data.chefs[0].id} className='profile userCard'>
          <Card.Content>
            <Image floated='right' size='tiny' src={data.chefs[0].image} />
            <Card.Header>
              {this.props.user.name}
            </Card.Header>
            <Card.Meta>
              <div>{data.chefs[0].specialty}</div>
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
          {data.events.slice(0, 3).map(event => (
            <Card className='eventCard' key={event.id}
              onClick={() => {
                this.props.changeSelectedEvent(event.id);
                this.props.history.push('/selectedEvent');
              }}>
                <Card.Content>
                  <Card.Header>
                    <span className='center eventText'>{event.name}</span>
                  </Card.Header>
                  <Card.Meta className='center'>
                    {`${event.date} ${event.time}`}
                  </Card.Meta>
                </Card.Content>
              </Card>
          ))}
        {/* add a Link to a page for all of the user's upcoming events */}
        </div>
        <div className='center miniPadding profile event'>
        {/* add a Link to a page for all of the user's upcoming events */}
          <div className='btnDiv'>

          <Link to='/BrowseEvents'>
            <Button className='butSec' inverted>
              See All Your Events
            </Button>
          </Link>
          <Link to='/createEvent'>
            <Button className='butPri' type='submit' inverted>
              Create New Event
            </Button>
          </Link>
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
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.loggedInUserInfo,
    socketReducer: state.socketReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));
