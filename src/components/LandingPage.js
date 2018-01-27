import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const LandingPage = () => (
  <div>
    <div className='cardHolder'>
      <Card className='cards'>
        <Image src='' />
        <Card.Content>
          <Card.Header>
            <Link to='/browseEvents'>Browse Events</Link>
          </Card.Header>
        </Card.Content>
      </Card>

      <Card className='cards'>
        <Image src='' />
        <Card.Content>
          <Card.Header>
            <Link to='/browseChefs'>Browse Chefs</Link>
          </Card.Header>
        </Card.Content>
      </Card>
    </div>
  </div>
);

export default LandingPage;
