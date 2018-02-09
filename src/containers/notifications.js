import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Icon, Button } from 'semantic-ui-react';
import { selectConversation } from '../actions';
import '../style.scss';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = { invitations: [] };
  }

  componentDidMount = () => {
    axios.get('/api/user/invitations', { params: {
      id: Number(window.localStorage.getItem('userId')),
      is_chef: window.localStorage.getItem('isChef'),
    } })
      .then((invites) => {
        this.setState({ invitations: invites.data });
      });
  }

  acceptEvent = (acceptEventObj) => {
    axios.post('/api/user/acceptEvent', acceptEventObj);
  }

  declineEvent = (declineEventObj) => {
    axios.post('/api/user/declineEvent', declineEventObj);
  }

  sendMessage = (messageObj) => {
    const convo = window.localStorage.getItem('isChef') === 'true'
      ? {
        user: messageObj.user_id,
        chef: window.localStorage.getItem('userId'),
      }
      :
      {
        user: window.localStorage.getItem('userId'),
        chef: messageObj.chef_id,
      };

    axios.post('/api/conversations', convo);
  }

  render = () => (
      <div>
        {this.state.invitations.map(invite => (
          // if else here to check for boolean for whether or not to render
          invite.accepted === null
            ?
              <Card style={{ margin: '2% auto' }} key={invite.id}>
                <Card.Content>
                  <Card.Header>
                    {invite.event_name}
                  </Card.Header>
                  <Card.Meta>
                    Hosted by {invite.host}
                  </Card.Meta>
                  <Card.Description>
                    {invite.host} would like you to cook at their event: {invite.name}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons' style={{ marginBottom: '2%' }}>
                    <Button basic color='green'
                    onClick={() => {
                      this.acceptEvent({
                        id: invite.id,
                        event_id: invite.event_id,
                        chef_id: invite.chef_id,
                        accepted: true,
                      });
                    }}>Accept</Button>
                    <Button basic color='red'
                    onClick={() => {
                      this.declineEvent({
                        id: invite.id,
                        event_id: invite.event_id,
                        chef_id: invite.chef_id,
                        accepted: false,
                      });
                    }}>Decline</Button>
                  </div>
                  <div>
                    <Button basic color='blue' style= {{ width: '100%' }}>Message!</Button>
                  </div>
                </Card.Content>
              </Card>
            : null
          ))}
      </div>
  );
}

function mapStateToProps(state) {
  return { selectedChefReducer: state.selectedChefReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectConversation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Notifications));
