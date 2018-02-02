import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../style.scss';
import { changeSelectedEvent } from '../actions';
import data from '../MockData';


const BrowseEvents = props => (
    <div className='topLevelDiv'>
      {data.events.map(event => (
        <Card
          key={event.id}
          className='browseEventCards'
          onClick={() => {
            props.changeSelectedEvent(event.id);
            props.history.push('/selectedEvent');
             }}>
          <Card.Content>
            <Image floated='right' size='mini' src={event.image} />
            <Card.Header>
              {event.name} ({event.cuisine})
            </Card.Header>
            <Card.Meta>
              <div>{event.host}</div>
            </Card.Meta>
            <Card.Description>
              <div>{event.description}</div>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span className='partySize'>Size: {event.guests}</span>
            <span className='eventBudget'>Budget: {event.budget}</span>
          </Card.Content>
        </Card>
      ))}
    </div>
);


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedEvent }, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(BrowseEvents));

