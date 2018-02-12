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

  shouldStarsDisplay = (eventDate, chefId) => {
    const hasHappened = new Date() > new Date(eventDate);
    return hasHappened && (window.localStorage.isChef !== 'true') && (chefId);
  };


  render() {
    const event = this.props.selectedEventReducer;
    const showStars = this.shouldStarsDisplay(event.date_time, event.chef_id);
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
              <div className='detailSegment'><Icon name='calendar'/>Date:  {event.time}, {event.eventDate}</div>
              <div className='detailSegment'><Icon name='users'/>Guests: {event.party_size}</div>
              <div className='detailSegment'><Icon name='comment outline'/>Special requests: {event.requests}</div>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
                <div style={{ textAlign: 'center' }} onClick={() => this.props.history.push('/editEvent')}>Edit Event</div>
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
                <div style={{ textAlign: 'center' }}>Send a message!</div>
                </div>
              </div>
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

