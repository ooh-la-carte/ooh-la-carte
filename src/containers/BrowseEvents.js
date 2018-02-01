import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../style.scss';
import { changeSelectedEvent } from '../actions';
import data from '../MockData';


const BrowseEvents = props => (
    <div className='topLevelDiv'>
      {data.events.map(event => (
            <Link key={event.id} to='/selectedEvent'>
              <Card
              className='browseEventCards'
              onClick={() => { props.changeSelectedEvent(event.id); }}>
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
            </Link>
          ))}
    </div>
);


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedEvent }, dispatch);
}

export default connect(null, mapDispatchToProps)(BrowseEvents);

