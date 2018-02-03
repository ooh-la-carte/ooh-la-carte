import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { selectConversation } from '../actions';
import '../style.scss';

const SelectedEvent = (props) => {
  const store = props.selectedEventReducer;
  return (
    <div className='selectedEventCardDiv'>
      <Card id='selectedEventCard'>
        <Image size='large' src={store.image} />
        <Card.Content>
          <Card.Header>
            <div className='selectedCardTitle'>{store.name}</div>
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Hosted by {store.host}
            </span>
            <div className='date'>
              Cuisine: {store.cuisine}
            </div>
            <div className='date'>
              Budget: {store.budget}
            </div>
          </Card.Meta>
          <Card.Description>
            <div className='detailSegment'>{store.description}</div>
            <div className='detailSegment'>Location: {store.location}</div>
            <div className='detailSegment'><Icon name='calendar'/>Date:  {store.time}, {store.date}</div>
            <div className='detailSegment'><Icon name='users'/>Guests: {store.guests}</div>
            <div className='detailSegment'><Icon name='comment outline'/>Special requests: {store.requests}</div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <span><Icon name='food'/>Food provided: {store.food ? 'Yes' : 'No'}</span>
            <Link to='/conversation' onClick={() => { props.selectConversation(store); }}><div style={{ textAlign: 'center' }}>Send a message!</div></Link>
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

