import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeSelectedEvent } from '../actions';
import '../style.scss';
import data from '../MockData';


const UserProfile = props => (
    <div className='topLevelDiv'>
      <Card key={data.chefs[0].id} className='profile userCard'>
        <Card.Content>
          <Image floated='right' size='tiny' src={data.chefs[0].image} />
          <Card.Header>
            {data.chefs[0].name}
          </Card.Header>
          <Card.Meta>
            <div>{data.chefs[0].specialty}</div>
          </Card.Meta>
          <Card.Description>
            <div>{data.chefs[0].description}</div>
          </Card.Description>
        </Card.Content>
        <Card.Content>
         <div className='center'><Link to='/settings'>Update User Settings</Link></div>
        </Card.Content>
      </Card>
      <h2 className='center'>Upcoming Events</h2>
      <div className='profile upcomingEvents container'>
      <Card.Group itemsPerRow={3}>
        {data.events.slice(0, 3).map(event => (
          <Link to='/selectedEvent' key={event.id}>
            <Card className='profile event'
            onClick={() => { props.changeSelectedEvent(event.id); }}>
              <Card.Content>
                <Card.Header>
                  <span className='profile event text'>{event.name}</span>
                </Card.Header>
                <Card.Meta className='center'>
                  {`${event.date}\n${event.time}`}
                </Card.Meta>
              </Card.Content>
            </Card>
          </Link>
        ))}
        </Card.Group>
      {/* add a Link to a page for all of the user's upcoming events */}
      </div>
      <div className='center'><Link to='/browseEvents'>See all your events</Link></div>
    </div>
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedEvent }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserProfile);
