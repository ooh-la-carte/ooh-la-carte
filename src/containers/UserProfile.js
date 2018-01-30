import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import '../style.scss';
import data from '../MockData';


const UserProfile = () => (
    <div className='topLevelDiv'>
      <Card key={data.chefs[0].id} className='browseEventCards'>
        <Card.Content>
          <Image floated='left' size='mini' src={data.chefs[0].image} />
          <Card.Header>
            {data.chefs[0].name}
          </Card.Header>
          <Card.Meta>
            <div>{data.chefs[0].menu}</div>
          </Card.Meta>
          <Card.Description>
            <div>{data.chefs[0].description}</div>
          </Card.Description>
        </Card.Content>
        <Card.Content>
            ({data.chefs[0].specialty})
        </Card.Content>
      </Card>
      <h1 className='pageHeader'>Upcoming Events</h1>
      <Card.Group itemsPerRow={2}>
      {data.events.map(event => (
        <Card className='profile event'>
        <Card.Content>
        <Card.Header>
            <span className='profile event'>{event.name}</span>
          </Card.Header>
          <Card.Meta>
            {`${event.date} \n ${event.time}`}
          </Card.Meta>
        </Card.Content>
        </Card>
      ))}
      </Card.Group>
    </div>
);


export default UserProfile;
