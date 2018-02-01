import React from 'react';
// import io from 'socket.io-client';
import { Input } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSocket } from '../actions';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => (
        <div className='chatInput'>
          <Input placeholder='Say hi!' style={{ width: '100%' }}/>
        </div>
  );
}

function mapStateToProps(state) {
  return { selectedConversation: state.selectedConversation };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSocket }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
