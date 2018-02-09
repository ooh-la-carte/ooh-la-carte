import React, { Component } from 'react';
// import io from 'socket.io-client';
import { Input } from 'semantic-ui-react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSocket, listenerOn } from '../actions';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      chat: [],
    };
    this.listen();
  }

  componentDidMount() {
    this.scrollToBottom();
    console.log('reciever up');
    axios.post('/api/convoMessages', {
      id: this.props.selectedConversation.convo_id,
      user: window.localStorage.getItem('userId'),
    })
      .then((chat) => {
        this.setState({ chat: chat.data });
      });
    // this.listen();
  }

  componentDidUpdate() {
    // this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.el.scrollIntoView({ behaviour: 'smooth' });
  }

  listen = () => {
    if (!this.props.listenerReducer) {
      this.props.listenerOn(true);
      this.props.socketReducer.on('private message', (data) => {
        if (window.localStorage.getItem('username') === data.reciever) {
          const newChat = [...this.state.chat, data];
          this.setState({ chat: newChat });
        }
      });
      this.props.socketReducer.on('self message', (data) => {
        if (Number(window.localStorage.getItem('userId')) === data.sender) {
          console.log('Chat data for chef sender: ', data);
          axios.post('/api/insertMessage', data)
            .then(() => {
              const chatData = data;
              chatData.self = true;
              const newChat = [...this.state.chat, chatData];
              this.addToChat(newChat);
            });
        }
      });
    }
    // put a redux store property here that checks if listeners are already on
  }

  componentWillUnmount = () => {
    this.props.socketReducer.off('private message');
    this.props.socketReducer.off('self message');
    this.props.listenerOn(false);
  }

  addToChat = (chat) => {
    this.setState({
      chat,
      input: '',
    });
    this.scrollToBottom();
  }

  changeInput = (e) => {
    this.setState({ input: e.target.value });
    // this.scrollToBottom();
  }

  submit = (e) => {
    if (e.key === 'Enter' && this.state.input !== '') {
      console.log('Convo info: ', this.props.selectedConversation);
      console.log('User info: ', window.localStorage.getItem('userId)'));
      this.props.socketReducer.emit('send', {
        text: this.state.input,
        sender: Number(window.localStorage.getItem('userId')),
        reciever: this.props.selectedConversation.username,
        reciever_id: this.props.selectedConversation.user_id,
        convo_id: this.props.selectedConversation.convo_id,
      }, () => console.log('Emitted'));
    }
  }

  render = () => (
    <div style={{ marginBottom: '20%' }}>
      <div className='chatDiv'>
        {this.state.chat.map((message, i) => (message.self === true
          ? <div key={i} className='chatMessages'>{message.text}</div>
          : <div key={i} className='chatMessages'>{message.text}</div>))}
        <div ref={ (el) => { this.el = el; }} />
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
    </div>
  )
}

function mapStateToProps(state) {
  return {
    selectedConversation: state.selectedConversation,
    socketReducer: state.socketReducer,
    listenerReducer: state.listenerReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSocket,
    listenerOn,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
