import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import '../style.scss';
import data from '../../../database/MockData';


const BrowseChefs = () => (
    <div className='topLevelDiv'>
      <h1 className='pageHeader'>Browse Chefs</h1>
      {data.chefs.map(event => (
            <Card key={event.id} className='browseEventCards'>
              <Card.Content>
                <Image floated='right' size='mini' src={event.image} />
                <Card.Header>
                  {event.name}
                </Card.Header>
                <Card.Meta>
                  <div>{event.specialty}</div>
                </Card.Meta>
                <Card.Description>
                  <div>{event.bio}</div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <span className=''>{event.rating} stars</span>
                <span className='yearsExperienceCard'>{event.experience} years</span>
                <span className='eventBudget'>{event.rate}</span>
              </Card.Content>
            </Card>
          ))}
    </div>
);


export default BrowseChefs;
