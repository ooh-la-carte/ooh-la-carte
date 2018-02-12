import React from 'react';
import axios from 'axios';
import { Card, Image } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

class AuthRedirect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      callbackReturned: false,
      newUser: false,
    };
  }

  componentDidMount() {
    axios.get('/auth/verify')
      .then((response) => {
        window.localStorage.accessToken = response.data.token;
        window.localStorage.userId = response.data.userId;
        window.localStorage.username = response.data.username;

        if (response.data.isChef === undefined) {
          this.setState({
            callbackReturned: true,
            newUser: true,
          });
        } else {
          this.setState({ callbackReturned: true });
        }
      });
  }
  /* eslint-disable */
  render() {
    return (
      <div>
        {this.state.callbackReturned 
          ? this.state.newUser ? <Redirect to='/contactinfo' />  : <Redirect to='/userProfile' />
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
  }
  /* eslint-enable */
}

export default AuthRedirect;
