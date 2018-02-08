import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';


const LandingPage = () => (
  <div>
    {window.localStorage.getItem('userId')
      ? <Redirect to='/userProfile'/>
      :
        <div className='cardHolder'>
          <Card className='landingCards'>
            <Image size='small' src='https://source.unsplash.com/Fw6nOTesO4c' />
            <Card.Content>
              <Card.Header>
                <Link to='/browseEvents'>Browse Events</Link>
              </Card.Header>
            </Card.Content>
          </Card>

          <Card className='landingCards'>
            <Image size='small' src='https://source.unsplash.com/nvsHAsuFC54' />
            <Card.Content>
              <Card.Header>
                <Link to='/browseChefs'>Browse Chefs</Link>
              </Card.Header>
            </Card.Content>
          </Card>
        </div>
    }
  </div>
);

export default LandingPage;
