import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Icon, Image, Rating } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { selectConversation, updateEventRating } from '../actions';
import '../style.scss';

class SelectedEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { rating: this.props.selectedEventReducer.rating };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  handleRatingChange = (e, { rating }) => {
    this.props.updateEventRating(rating);
  }

  shouldStarsDisplay = (eventDate, chefId, creatorId) => {
    const isOver = new Date() > new Date(eventDate);
    return isOver && (Number.parseInt(window.localStorage.userId, 10) === creatorId) && (chefId);
  };

  sendInvite = (inviteObj) => {
    axios.post('/api/user/sendInvite', inviteObj);
  }


  render() {
    const event = this.props.selectedEventReducer;
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const eventDate = new Date(event.date_time);
    const showStars = this.shouldStarsDisplay(event.date_time, event.chef_id, event.creator_id);
    let stars;
    if (showStars) {
      if (event.rating !== null) {
        stars = <Rating
                    rating = {event.rating}
                    maxRating={5}
                  />;
      } else {
        stars = <Rating
                    icon='star'
                    rating={event.rating}
                    maxRating={5}
                    onRate={this.handleRatingChange}
                  />;
      }
    }
    return (
      <div className='selectedEventCardDiv'>
        <Card id='selectedEventCard'>
          <Image size='large' src={event.img} />
          <Card.Content>
            <Card.Header>
              <div className='selectedCardTitle'>{event.name}</div>
            </Card.Header>
            <Card.Meta>
              <div>{ showStars ?
                stars
                : null
              }</div>
              <span className='date'>
                Hosted by {event.creator_username}
              </span>
              <div className='date'>
                Cuisine: {event.cuisine}
              </div>
              <div className='date'>
                Budget: {event.budget}
              </div>
            </Card.Meta>
            <Card.Description>
              <div className='detailSegment'>{event.description}</div>
              <div className='detailSegment'>Location: {event.city}, {event.state} {event.zip_code}</div>
              <div className='detailSegment'><Icon name='calendar'/>
                Date: {`${monthNames[eventDate.getMonth()]} ${eventDate.getDate()}, ${eventDate.getFullYear()}`}
              </div>
              <div className='detailSegment'><Icon name='users'/>Guests: {event.party_size}</div>
              <div className='detailSegment'><Icon name='comment outline'/>Special requests: {event.requests}</div>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
                {event.hostId === window.localStorage.getItem('userId')
                  ? <div style={{ textAlign: 'center' }} onClick={() => this.props.history.push('/editEvent')}>Edit Event</div>
                  : null
                }
              <span><Icon name='food'/>Food provided: {event.food ? 'Yes' : 'No'}</span>
                <div onClick={() => {
                  const convo = {
                    user: event.creator_id,
                    chef: window.localStorage.getItem('userId'),
                  };
                  axios.post('/api/conversations', convo)
                    .then((results) => {
                      // need convo id here
                      const obj = results.data[0];
                      obj.chef_id = Number(window.localStorage.getItem('userId'));
                      obj.convo_id = obj.id;
                      obj.username = event.creator_username;
                      console.log('Select chef conversation store: ', obj);
                      this.props.selectConversation(obj);
                    })
                    .then(() => {
                      this.props.history.push('/conversation');
                    });
                }}>
                  <div>Send a message!</div>
                </div>
              </div>
              <div onClick={() => {
                this.sendInvite({
                  event_id: event.id,
                  user_id: event.creator_id,
                  host: event.creator_username,
                  chef_id: Number(window.localStorage.getItem('userId')),
                  sender: window.localStorage.getItem('username'),
                  chef: window.localStorage.getItem('username'),
                  event_name: event.name,
                  accepted: null,
                });
              }}>Send an offer!</div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { selectedEventReducer: state.selectedEventReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectConversation,
    updateEventRating,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectedEvent));

