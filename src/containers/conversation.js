import React, { Component } from 'react';
// import io from 'socket.io-client';
import { Input } from 'semantic-ui-react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSocket } from '../actions';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      chat: [],
    };
  }

  componentDidMount() {
    console.log('reciever up');
    axios.post('/api/convoMessages', {
      id: this.props.selectedConversation.convo_id,
      user: window.localStorage.getItem('userId'),
    })
      .then((chat) => {
        this.setState({ chat: chat.data });
        this.listen();
      });
  }

  listen = () => {
    this.props.socketReducer.on('private message', (data) => {
      if (window.localStorage.getItem('username') === data.reciever) {
        const newChat = [...this.state.chat, data];
        this.setState({ chat: newChat });
      }
    });
    this.props.socketReducer.on('self message', (data) => {
      if (Number(window.localStorage.getItem('userId')) === data.sender) {
        const newChat = [...this.state.chat, data];
        this.setState({ chat: newChat });
        axios.post('/api/insertMessage', data);
      }
    });
  }

  changeInput = (e) => {
    this.setState({ input: e.target.value });
  }

  submit = (e) => {
    if (e.key === 'Enter') {
      this.props.socketReducer.emit('send', {
        text: this.state.input,
        sender: Number(window.localStorage.getItem('userId')),
        reciever: this.props.selectedConversation.username,
        reciever_id: this.props.selectedConversation.id,
        convo_id: this.props.selectedConversation.convo_id,
      }, () => console.log('Emitted'));
      this.setState({ input: '' });
    }
  }

  render = () => (
    <div style={{ height: '100%' }}>
      {this.state.chat.map((message, i) => (<div key={i} className='chatMessages'>{message.text}</div>))}
      <div className='chatInput'>
        <Input
        value={ this.state.input }
        onChange={ this.changeInput }
        onKeyPress= { this.submit }
        placeholder='Say hi!'
        style={{ width: '100%' }}
        />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    selectedConversation: state.selectedConversation,
    socketReducer: state.socketReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSocket }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
