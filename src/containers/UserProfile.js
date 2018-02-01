import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { changeSelectedEvent } from '../actions';
import '../style.scss';
import data from '../MockData';


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: 'yes',
      later: 'no',
    };
  }

  handleChange = (e, { value }) => {
    this.setState({ value });
  }

  render() {
    return (
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
        <div className='center miniPadding profile event'>
          {data.events.slice(0, 3).map(event => (
            <Card className='eventCard' key={event.id}
              onClick={() => {
                this.props.changeSelectedEvent(event.id);
                this.props.history.push('/selectedEvent');
              }}>
                <Card.Content>
                  <Card.Header>
                    <span className='center eventText'>{event.name}</span>
                  </Card.Header>
                  <Card.Meta className='center'>
                    {`${event.date} ${event.time}`}
                  </Card.Meta>
                </Card.Content>
              </Card>
          ))}
        {/* add a Link to a page for all of the user's upcoming events */}
        </div>
        <div className='center'><Link to='/browseEvents'>See all your events</Link></div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedEvent }, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(UserProfile));
