import React, { Component } from 'react';
import { Header, Modal } from 'semantic-ui-react';
import SignUpForm from './SignUpForm';
import '../style.scss';

class SignUpModal extends Component {
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
        trigger={<a onClick={this.handleOpen} className='loginLink'>Sign up</a>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='user circle' content='Sign Up' />
        <Modal.Content>
          <div>
            <SignUpForm handleClose={this.handleClose} toggleDropDown={this.props.toggleDropDown}/>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

export default SignUpModal;

