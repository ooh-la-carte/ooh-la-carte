import React, { Component } from 'react';
import { Card, Image, Segment, Grid } from 'semantic-ui-react';
import { Collapse } from 'react-collapse';
import { Redirect, withRouter } from 'react-router-dom';
import logo from '../../public/android-chrome-512x512.png';
import chatPic from '../../public/chat.png';
import chefPic from '../../public/chef.png';
import eventPic from '../../public/event.png';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '' };
  }

  setStoryVersion = (selectedUser) => {
    if (this.state.user !== '') {
      this.setState({ user: '' });
      setTimeout(() => this.setState({ user: selectedUser }), 1000);
    } else {
      this.setState({ user: selectedUser });
    }
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
            <Grid.Column verticalAlign='middle' width={5}>
              <Image size='small' id="logo" src={logo} alt='logo image' />
            </Grid.Column>
            <Grid.Column className='textColumn' verticalAlign='middle' width={11}>
              <Segment className='textBox'>
                  <h4 className='nav center'>A new and exciting way to connect chefs with clients for individualized dining experiences!</h4>
              </Segment>
            </Grid.Column>
          </Grid>
          <br />
          <Image rounded alt='Delicious Salad' src='https://source.unsplash.com/zhiZOpm99Iw/640x480'/>
        </div>
        <br />
        <h3 className='scriptFont title'>Interested in being...</h3>
        <div className='cardHolder'>
          <Card className='landingCards' onClick={() => { this.setStoryVersion('user'); }}>
            <Image size='small' alt='Dining Room' src='https://source.unsplash.com/Fw6nOTesO4c/640x480' />
            <Card.Content>
              a patron?
            </Card.Content>
          </Card>
          <Card className='landingCards' onClick={() => { this.setStoryVersion('chef'); }}>
            <Image size='small' alt='Black and White Chef' src='https://source.unsplash.com/nvsHAsuFC54/640x480' />
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
                <Grid.Column className='scriptFont storyText' width={16}>
                  Set up a profile and browse though chefs in your area
                </Grid.Column>
                <br />
              <Grid.Column width={9}>
                <Image size='medium' rounded id="logo" src={chefPic} alt='logo image' />
              </Grid.Column>
              <Grid.Column className='textColumn' verticalAlign='middle' width={7}>
                <Segment className='textBox'>
                  <h4 className='nav center'>
                  See chef ratings and view thier menus.
                   Filter by rate and cuisine to find the perfect chef for your needs.
                  </h4>
                </Segment>
              </Grid.Column>
              <Grid.Column width={16}> <br /></Grid.Column>
              <Grid.Column width={16}>
                <Image size='small' centered rounded id="logo" src={chatPic} alt='logo image' />
              </Grid.Column>
              <Grid.Column className='scriptFont storyText' width={16}>
                Chat with your desired chef in real time to discuss the details of your event
              </Grid.Column>
              <Grid.Column width={16}>
                <Segment className='textBox'>
                  <h4 className='nav center'>
        Set up the perfect time for your event and enjoy a professionally catered dining experience
                  </h4>
                </Segment>
                <br />
              </Grid.Column>
              <Grid.Column className='scriptFont storyText' width={16}>
                Start your search now by browsing our chefs!
              </Grid.Column>
        </Grid.Row>
      </Grid>
        <div>
          <Card className='bottomLandingCards' onClick={() => { this.props.history.push('/browseChefs'); }}>
            <Image size='small' alt='Black and White Chef' src='https://source.unsplash.com/nvsHAsuFC54/640x480' />
            <Card.Content>
                Browse Chefs
            </Card.Content>
          </Card>
        </div>
      </Collapse>
    {/* chef story */}
              <Collapse isOpened={this.state.user === 'chef'}>
          <Grid>
            <Grid.Row>
                <Grid.Column className='scriptFont storyText' width={16}>
                  Create a personalized account and show off your abilities
                </Grid.Column>
                <br />
              <Grid.Column width={9}>
                <Image size='medium' rounded id="logo" src={eventPic} alt='logo image' />
              </Grid.Column>
              <Grid.Column className='textColumn' verticalAlign='middle' width={7}>
                <Segment className='textBox'>
                  <h4 className='nav center'>
                    Browse user created events available in your area and find opportunities
                    that fit your schedule
                  </h4>
                </Segment>
              </Grid.Column>
              <Grid.Column width={16}> <br /></Grid.Column>
              <Grid.Column width={16}>
                <Image size='small' centered rounded id="logo" src={chatPic} alt='logo image' />
              </Grid.Column>
              <Grid.Column className='scriptFont storyText' width={16}>
                Chat with your patrons in real time to discuss and finalize their event details
              </Grid.Column>
              <Grid.Column width={16}>
                <Segment className='textBox'>
                  <h4 className='nav center'>
                    Deliver a professionally catered dining experience that amazes your clients
                  </h4>
                </Segment>
                <br />
              </Grid.Column>
              <Grid.Column className='scriptFont storyText' width={16}>
                Start your search now by browsing our events!
              </Grid.Column>
        </Grid.Row>
      </Grid>
      <div>
        <Card className='bottomLandingCards' onClick={() => { this.props.history.push('/browseEvents'); }}>
          <Image size='small' alt='Dining Room' src='https://source.unsplash.com/Fw6nOTesO4c/640x480' />
          <Card.Content>
              Browse Events
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
