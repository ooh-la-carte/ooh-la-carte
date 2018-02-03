import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSocket } from '../actions';

const socketUrl = 'http://localhost:8888/';
class ChatTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = { convos: [] };
    this.initSocket = this.initSocket.bind(this);
  }

  componentDidMount = () => {
    axios.post('/api/getConvos', {
      id: window.localStorage.getItem('userId'),
      isChef: window.localStorage.getItem('isChef'),
    })
      .then(convos => this.setState({ convos: convos.data }))
      .catch(err => console.log(err));
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket() {
    if (!this.props.socketReducer.id) {
      const socket = io(socketUrl);
      socket.on('connect', () => {
        socket.userId = window.localStorage.getItem('userId');
        console.log('Connected');
        console.log('Socket: ', socket);
        this.props.setSocket(socket);
      });
    }
  }

  render = () => (
        <div className='container'>
          {this.state.convos.map(convo => <div key={convo.id}>{convo.id}</div>)}
        </div>
  );
}

function mapStateToProps(state) {
  return { socketReducer: state.socketReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSocket }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatTab);
