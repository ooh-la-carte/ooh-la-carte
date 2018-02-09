import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Icon, Image, Rating } from 'semantic-ui-react';
import { selectConversation } from '../actions';
import Helpers from '../helpers';
import '../style.scss';

class SelectedChef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myEvents: [],
      menu: [],
      eventsDropdown: false,
    };
  }

  componentDidMount = () => {
    axios.get('/api/events', { params: {
      field: 'creator_id',
      target: Number(window.localStorage.getItem('userId')),
    } })
      .then((events) => {
        console.log('Events from db: ', events.data);
        this.setState({ myEvents: events.data });
      });
    axios.get('/api/user/menus', { params: { id: this.props.selectedChefReducer.id } })
      .then((menuItems) => {
        this.setState({ menu: menuItems.data });
      });
  }

  openMyEvents = () => {
    console.log(this.state.eventsDropdown);
    this.setState({ eventsDropdown: !this.state.eventsDropdown });
  }

  sendInvite = (inviteObj) => {
    axios.post('/api/user/sendInvite', inviteObj);
  }

  render = () => {
    const chef = this.props.selectedChefReducer;
    const { facebook, twitter, instagram } = chef;
    return (
        <div className='selectedEventCardDiv'>
          <Card id='selectedEventCard'>
            <Image size='large' src={chef.image} />
            <Card.Content>
              <Card.Header>
                <div className='selectedCardTitle'>{chef.username}</div>
              </Card.Header>
              <Card.Meta>
                <div>Name: {chef.name}</div>
                <div>Cuisine: {Helpers.getCuisineList(JSON.parse(chef.cuisine))}</div>
                <div>Rate: {chef.rate}</div>
                 {chef.city ?
                  <div>{chef.city}, {chef.state}</div>
                  : null }
              </Card.Meta>
              <Card.Description>
                <div className='detailSegment'>{chef.bio}</div>
                <div className='detailSegment'>Restuarant: {chef.restuarant}</div>
                <div className='detailSegment'>
                  <Icon name='empty star'/>
                  Rating:
                  { chef.rating ?
                    <Rating
                      icon='star'
                      rating={Helpers.calculateRating(chef.rating).reduce((a, c) => a / c)}
                      maxRating={5}
                    /> :
                    ' no reviews yet'
                  }
                </div>
                <div className='detailSegment'><Icon name='calendar'/> Avalability: Calendar thing here </div>
                <div className='detailSegment'><Icon name='map outline'/> Menu:
                {this.state.menu.map(item => (
                    <div
                    className='boxed center lightlyColored'
                    key={item.id}
                    style={{ marginTop: '2%' }}>
                      <div>{item.dish}</div>
                      <div>{item.description}</div>
                      <div>{item.price}</div>
                      <div>{item.cuisine_type}</div>
                      <image src={item.pic}/>
                    </div>
                  ))}
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div>
                <span><Icon name='food'/>Years experience: {chef.experience}</span>
              <div className='center miniPadding'>
                {facebook ?
                  <Link to={facebook}>
                    <Icon name='facebook square' className='OLCcolor' size='huge' />
                  </Link>
                  : null
                }
                {twitter ?
                  <a target="_blank" href={twitter}>
                    <Icon name='twitter' className='OLCcolor' size='huge' />
                  </a>
                  : null
                }
                {instagram ?
                   <a href={twitter}>
                    <Icon name='instagram' className='OLCcolor' size='huge' />
                  </a>
                  : null
                }
              </div>
                <div onClick={() => {
                  const convo = {
                    user: window.localStorage.getItem('userId'),
                    chef: chef.id,
                  };
                  axios.post('/api/conversations', convo)
                    .then((results) => {
                      // need convo id here
                      const obj = results.data[0];
                      console.log('Before manipulation: ', obj);
                      obj.convo_id = obj.id;
                      obj.username = chef.username;
                      obj.user_id = obj.chef_id;
                      console.log('Select chef conversation store: ', obj);
                      this.props.selectConversation(obj);
                    })
                    .then(() => {
                      this.props.history.push('/conversation');
                    });
                }}><div style={{ textAlign: 'center' }}>Send a message!</div></div>
                <br/>
                <div onClick={() => { this.openMyEvents(); }}>Send an invitation</div>
              </div>
              {this.state.eventsDropdown
                ? this.state.myEvents.map(event =>
                  <div key={event.id}>
                    <span>{event.name}</span>
                    <span style={{ float: 'right' }} onClick={() => {
                      this.sendInvite({
                        event_id: event.id,
                        user_id: Number(window.localStorage.getItem('userId')),
                        host: window.localStorage.getItem('username'),
                        chef_id: chef.id,
                        chef: chef.username,
                        event_name: event.name,
                        accepted: null,
                      });
                      this.setState({ eventsDropdown: false });
                    }}>Send Invite</span>
                  </div>)
                : null
              }
            </Card.Content>
          </Card>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedChefReducer: state.selectedChefReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectConversation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectedChef));
