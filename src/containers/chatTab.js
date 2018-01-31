import React from 'react';
import io from 'socket.io-client';

const socketUrl = 'http://localhost:8888/';
export default class ChatTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = { socket: null };
    this.initSocket = this.initSocket.bind(this);
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket() {
    if (!this.state.socket) {
      const socket = io(socketUrl);
      socket.on('connect', () => {
        console.log('Connected');
      });
      this.setState({ socket });
    }
  }

  render = () => (
        <div className='container'>
          Chat room!
        </div>
  );
}
