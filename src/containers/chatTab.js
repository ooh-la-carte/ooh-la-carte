import React from 'react';
// import io from 'socket.io-client';
import axios from 'axios';
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

  componentWillMount = () => {
    axios.post('/api/getConvos', {
      id: window.localStorage.getItem('userId'),
      isChef: window.localStorage.getItem('isChef'),
    })
      .then((convos) => {
        console.log('CONVO DATA: ', convos.data);
        this.setState({ convos: convos.data });
      })
      .catch(err => console.log(err));
  }

  render = () => (
        <div className='container'>
        {window.localStorage.getItem('isChef') === 'true'
          ?
            <div>
              {this.state.convos.map(convo =>
                <div key={convo.chatId} className='chatMessages'>
                  <div onClick={() => {
                    axios.get('/api/user/info', { params: { id: convo.recipientId } })
                      .then((user) => {
                        const obj = user.data;
                        obj.convo_id = convo.chatId;
                        this.props.selectConversation(obj);
                      })
                      .then(() => {
                        this.props.history.push('/conversation');
                      });
                  }}>{convo.recipientUsername}</div>
                </div>)}
            </div>
          :
            <div>
              {this.state.convos.map(convo =>
                <div key={convo.chatId} className='chatMessages'>
                  <div onClick={() => {
                    axios.get('/api/user/info', { params: { id: convo.recipientId } })
                      .then((user) => {
                        const obj = user.data;
                        obj.convo_id = convo.chatId;
                        this.props.selectConversation(obj);
                      })
                      .then(() => {
                        this.props.history.push('/conversation');
                      });
                  }}>{convo.recipientUsername}</div>
                </div>)}
            </div>
        }
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
