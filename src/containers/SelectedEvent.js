import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Rating } from 'semantic-ui-react';
import axios from 'axios';
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

  shouldStarsDisplay = (eventDate) => {
    const hasHappened = new Date() > new Date(eventDate);
    return hasHappened && (window.localStorage.isChef !== true);
  };

  render() {
    const event = this.props.selectedEventReducer;
    const showStars = this.shouldStarsDisplay(this.props.selectedEventReducer.date_time);
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
              <Link to='/conversation' onClick={() => { this.props.selectConversation(event); }}><div style={{ textAlign: 'center' }}>Send a message!</div></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectedEvent);

