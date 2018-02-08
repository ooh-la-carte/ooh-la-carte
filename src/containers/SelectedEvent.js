import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Icon, Image, Rating } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { selectConversation } from '../actions';
import '../style.scss';

class SelectedEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { rating: 0 };
  }

  handleRatingChange = (e, { rating }) => {
    this.setState({ rating });
    const eventRatingObj = {
      rating,
      eventId: this.props.selectedEventReducer.id,
      chefId: this.props.selectedEventReducer.chef_id,
    };
    axios.post('/api/updateEventRating', eventRatingObj);
  }

  shouldStarsDisplay = (eventDate, chefId) => {
    const hasHappened = new Date() > new Date(eventDate);
    return hasHappened && (window.localStorage.isChef !== true);
  };

  render() {
    const event = this.props.selectedEventReducer;
    const { date_time: eventDate, chef_id: chefId } = this.props.selectedEventReducer;
    const showStars = this.shouldStarsDisplay(eventDate, chefId);
    console.log('show stars in render:', showStars);
    let stars;
    if (showStars) {
      if (this.props.selectedEventReducer.rating !== null) {
        stars = <Rating
                    rating = {this.props.selectedEventReducer.rating}
                    maxRating={5}
                  />;
      } else {
        stars = <Rating
                    icon='star'
                    rating={this.state.rating}
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
              <div className='detailSegment'><Icon name='calendar'/>Date:  {event.time}, {event.date}</div>
              <div className='detailSegment'><Icon name='users'/>Guests: {event.party_size}</div>
              <div className='detailSegment'><Icon name='comment outline'/>Special requests: {event.requests}</div>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div>
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
                }}><div style={{ textAlign: 'center' }}>Send a message!</div></div>
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
  return bindActionCreators({ selectConversation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectedEvent));

