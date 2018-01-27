import React, { Component } from 'react';
import { Header, Modal } from 'semantic-ui-react';
import LoginForm from './LoginForm';
import '../style.scss';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <Modal
        trigger={<a onClick={this.handleOpen} className='loginLink'>Login</a>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='user circle' content='Login' />
        <Modal.Content>
          <div>
            <LoginForm handleClose={this.handleClose}/>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

export default LoginModal;

