import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.scss';

class SelectedEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.eventSelected.name}
        {this.props.eventSelected.host}
        {this.props.eventSelected.description}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { eventSelected: state.selectedEventReducer };
}

export default connect(mapStateToProps)(SelectedEvent);


