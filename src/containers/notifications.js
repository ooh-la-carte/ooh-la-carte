import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
// import { Card, Icon, Image } from 'semantic-ui-react';
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

  render = () => (
      <div>
        {this.state.invitations.map(invite =>
          <div key={invite.id}>{invite.event_name} -by {invite.host}</div>)}
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
