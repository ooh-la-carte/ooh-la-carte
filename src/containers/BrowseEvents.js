import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import '../style.scss';
import data from '../MockData';


const BrowseEvents = () => (
    <div className='topLevelDiv'>
      <h1 className='pageHeader'>Browse Events</h1>
      {data.events.map(event => (
            <Card key={event.id} className='browseEventCards'>
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


export default BrowseEvents;
