import React from 'react';
// import io from 'socket.io-client';
import axios from 'axios';
import { Segment, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSocket, selectConversation } from '../actions';

// const socketUrl = 'http://localhost:8888/';
class ChatTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = { convos: [] };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  componentWillMount = () => {
    axios.post('/api/getConvos', {
      id: window.localStorage.getItem('userId'),
      isChef: window.localStorage.getItem('isChef'),
    })
      .then((convos) => {
        this.setState({ convos: convos.data });
      })
      .catch(err => console.log(err));
  }

  render = () => (
        <div>
          <Segment.Group className='whiteBackground standardWidth'>
              <Segment className='chatHeader'>My Conversations</Segment>
              <Segment.Group>
                {this.state.convos.length === 0
                ? <Segment>You have not started any chats yet!</Segment>
                : null
              }
              {this.state.convos.map(convo =>
                <Segment className='chatListItems' key={convo.chatId}>
                  <div onClick={() => {
                    axios.get('/api/user/info', { params: { id: convo.recipientId } })
                      .then((user) => {
                        const obj = user.data;
                        obj.convo_id = convo.chatId;
                        obj.user_id = convo.recipientId;
                        console.log(obj);
                        this.props.selectConversation(obj);
                      })
                      .then(() => {
                        this.props.history.push('/conversation');
                      });
                  }}><Icon name='comment'/> {convo.recipientUsername}</div>
                </Segment>)}
              </Segment.Group>
          </Segment.Group>
        </div>
  );
}

function mapStateToProps(state) {
  return { socketReducer: state.socketReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSocket,
    selectConversation,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatTab));
