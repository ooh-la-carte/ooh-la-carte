import React from 'react';
import { Card, Image, Segment, Grid } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';

const LandingPage = props => (
  <div>
    {window.localStorage.getItem('userId')

      ? <Redirect to='/userProfile'/>
      :
      <div className='topLevelDiv'>

      <div className='center boxed'>
      <Segment className='textBox'>
        <h4 className='nav center'>A new and exciting way to connect chefs with clients for individualized dining experiences!</h4>
        </Segment>
        <Image rounded src='https://source.unsplash.com/zhiZOpm99Iw'/>
      </div>
      <br />
        <div className='center boxed'>

      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>Are you a prospective chef?</Grid.Column>
          <Grid.Column width={8}>Are you a prospective client? </Grid.Column>
          <Grid.Column width={8}>Create an account and show of your abilities</Grid.Column>
          <Grid.Column width={8}>Set up a profile and browse though chefs in your area</Grid.Column>
          <Grid.Column width={8}>Browse user events available in your area</Grid.Column>
          <Grid.Column width={8}>See chef's ratings and view some of thier menus</Grid.Column>
          <Grid.Column width={16}>
            chat with each other in real time to discuss the details
          </Grid.Column>
          <Grid.Column width={16}>Arrane a time for your event</Grid.Column>
          <Grid.Column width={16}>Have a professionally catered dining experience</Grid.Column>
          <Grid.Column width={16}>
            Start your search now by browsing our chefs and events!
          </Grid.Column>

        </Grid.Row>
      </Grid>
      </div>
        <div className='cardHolder'>
          <Card className='landingCards' onClick={() => { props.history.push('/browseEvents'); }}>
            <Image size='small' src='https://source.unsplash.com/Fw6nOTesO4c' />
            <Card.Content>
              <Card.Header>
                Browse Events
              </Card.Header>
            </Card.Content>
          </Card>

          <Card className='landingCards' onClick={() => { props.history.push('/browseChefs'); }}>
            <Image size='small' src='https://source.unsplash.com/nvsHAsuFC54' />
            <Card.Content>
              <Card.Header>
                Browse Chefs
              </Card.Header>
            </Card.Content>
          </Card>
        </div>
        </div>
    }
  </div>
);

export default withRouter(LandingPage);
