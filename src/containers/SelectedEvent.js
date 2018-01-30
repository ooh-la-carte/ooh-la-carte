import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import '../style.scss';

class SelectedEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const store = this.props.selectedEventReducer;
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

export default connect(mapStateToProps)(SelectedEvent);
