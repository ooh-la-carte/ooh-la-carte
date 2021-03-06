import React, { Component } from 'react';
import { Modal, Segment, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { updateUserInfoByField, updateLastPrompted } from '../actions';
import iconLogo from '../../public/apple-touch-icon.png';
import iOSshare from '../../public/share.png';
import '../style.scss';

class AddToHomescreen extends Component {
  handleClose = () => {
    this.props.history.push('/userProfile');
  }

  render() {
    return (
      <Modal
      className='boxed center'
        onClose={this.handleClose}
        defaultOpen={true}
        basic
        size='small'
        closeIcon
      >
        <Modal.Content className='center'>
          <Segment className='textBox nav'>
            <Image height='50px' width='50px' centered rounded src={iconLogo} />
            <h3>Add Ooh La Carte to your home screen</h3>
            <Modal.Description>
              <p>Just tap the </p>
              <Image className='iconPadding' centered height='22px' width='17px' src={iOSshare} />
              <p>icon below then select 'Add to Home Screen'</p>
            </Modal.Description>
          </Segment>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUserInfoByField,
    updateLastPrompted,
  }, dispatch);
}

function mapStateToProps(state) {
  return { user: state.loggedInUserInfo };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddToHomescreen));

