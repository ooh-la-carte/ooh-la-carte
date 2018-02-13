import React, { Component } from 'react';
import { Card, Image, Segment, Grid } from 'semantic-ui-react';
import { Collapse } from 'react-collapse';
import { Redirect, withRouter } from 'react-router-dom';
import logo from '../../public/android-chrome-512x512.png';


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '' };
  }

  setStoryVersion = (selectedUser) => {
    let user = selectedUser;
    if (this.state.user !== '') {
      user = '';
    }
    this.setState({ user });
  }

  render() {
    return (
  <div>
    {window.localStorage.getItem('userId')

      ? <Redirect to='/userProfile'/>
      :
      <div className='topLevelDiv'>

        <h4 className='OLCtitle'>Ooh La Carte</h4>

      <div className='center boxed'>
      <Grid>
        <Grid.Row>
        <Grid.Column className='logoColumn' width={5}>
          <Image size='small' id="logo" src={logo} alt='logo image' />
        </Grid.Column>
        <Grid.Column className='textColumn' width={11}>
            <Segment className='textBox'>
              <h4 className='nav center'>A new and exciting way to connect chefs with clients for individualized dining experiences!</h4>
            </Segment>
        </Grid.Column>

        </Grid.Row>
      </Grid>
      <br />
        <Image rounded src='https://source.unsplash.com/zhiZOpm99Iw'/>
      </div>
      <br />


        <h3 className='scriptFontTitle'>Interested in being...</h3>

        <div className='cardHolder'>
          <Card className='landingCards' onClick={() => { this.setStoryVersion('user'); }}>
            <Image size='small' src='https://source.unsplash.com/Fw6nOTesO4c' />
            <Card.Content>
                a patron?
            </Card.Content>
          </Card>
          <Card className='landingCards' onClick={() => { this.setStoryVersion('chef'); }}>
            <Image size='small' src='https://source.unsplash.com/nvsHAsuFC54' />
            <Card.Content>
                 a chef?
            </Card.Content>
          </Card>
        </div>


        <div className='center boxed'>

      {/* user story */}
      <Collapse isOpened={this.state.user === 'user'}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            Set up a profile and browse though chefs in your area
          </Grid.Column>
          <Grid.Column width={16}>See chef's ratings and view some of thier menus</Grid.Column>
          <Grid.Column width={16}>
            chat with each other in real time to discuss the details
          </Grid.Column>
          <Grid.Column width={16}>Arrange a time for your event</Grid.Column>
          <Grid.Column width={16}>Have a professionally catered dining experience</Grid.Column>
          <Grid.Column width={16}>
            Start your search now by browsing our chefs!
          </Grid.Column>

        </Grid.Row>
      </Grid>
        <div className='cardHolder'>
          <Card className='landingCards' onClick={() => { this.props.history.push('/browseEvents'); }}>
            <Image size='small' src='https://source.unsplash.com/Fw6nOTesO4c' />
            <Card.Content>
                Browse Events
            </Card.Content>
          </Card>
          </div>
      </Collapse>
    {/* chef story */}
      <Collapse isOpened={this.state.user === 'chef'}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            Create a personalized account and show off your abilities
          </Grid.Column>
          <Grid.Column width={16}>Browse user events available in your area</Grid.Column>
          <Grid.Column width={16}>
            chat with each other in real time to discuss the details
          </Grid.Column>
          <Grid.Column width={16}>Arrange a time for the event</Grid.Column>
          <Grid.Column width={16}>Provide a personalized dining experience</Grid.Column>
          <Grid.Column width={16}>
            Start your search now by browsing our events!
          </Grid.Column>

        </Grid.Row>
      </Grid>
          <div>

          <Card className='landingCards' onClick={() => { this.props.history.push('/browseChefs'); }}>
            <Image size='small' src='https://source.unsplash.com/nvsHAsuFC54' />
            <Card.Content>
                Browse Chefs
            </Card.Content>
          </Card>
      </div>
      </Collapse>

        </div>
        </div>
    }
  </div>
    );
  }
}

export default withRouter(LandingPage);
