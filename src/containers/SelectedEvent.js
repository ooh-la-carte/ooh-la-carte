import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { selectConversation } from '../actions';
import '../style.scss';

const SelectedEvent = (props) => {
  const event = props.selectedEventReducer;
  return (
    <div className='selectedEventCardDiv'>
      <Card id='selectedEventCard'>
        <Image size='large' src={event.img} />
        <Card.Content>
          <Card.Header>
            <div className='selectedCardTitle'>{event.name}</div>
          </Card.Header>
          <Card.Meta>
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
            <Link to='/conversation' onClick={() => { props.selectConversation(event); }}><div style={{ textAlign: 'center' }}>Send a message!</div></Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};


function mapStateToProps(state) {
  return { selectedEventReducer: state.selectedEventReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectConversation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedEvent);

