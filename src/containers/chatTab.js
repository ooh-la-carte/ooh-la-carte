import React from 'react';
// import io from 'socket.io-client';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
      .then(convos => this.setState({ convos: convos.data }))
      .catch(err => console.log(err));
  }

  // componentWillMount() {
  //   this.initSocket();
  // }

  // initSocket = () => {
  //   if (!this.props.socketReducer.id) {
  //     const socket = io(socketUrl);
  //     socket.on('connect', () => {
  //       socket.userId = window.localStorage.getItem('userId');
  //       console.log('Connected');
  //       this.props.setSocket(socket);
  //     });
  //   }
  // }

  render = () => (
        <div className='container'>
        {window.localStorage.getItem('isChef') === 'true'
          ?
            <div>
              {this.state.convos.map(convo =>
                <div key={convo.chatId} className='chatMessages'>
                  <Link to='/conversation' onClick={() => {
                    axios.get('/api/user/info', { params: { id: convo.user_id } })
                      .then((user) => {
                        console.log(user);
                        const obj = user.data;
                        obj.convo_id = convo.chatId;
                        this.props.selectConversation(obj);
                      });
                  }}>{convo.chatId}</Link>
                </div>)}
            </div>
          :
            <div>
              {this.state.convos.map(convo =>
                <div key={convo.chatId}>
                  <Link to='/conversation' onClick={() => {
                    axios.get('/api/user/info', { params: { id: convo.chef_id } })
                      .then((user) => {
                        const obj = user.data;
                        obj.convo_id = convo.chatId;
                        this.props.selectConversation(obj);
                      });
                  }}>{convo.chatId}</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatTab);
