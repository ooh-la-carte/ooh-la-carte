import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import { selectConversation } from '../actions';
import '../style.scss';

const SelectedChef = (props) => {
  const store = props.selectedChefReducer;
  return (
    <div className='selectedEventCardDiv'>
      <Card id='selectedEventCard'>
        <Image size='large' src={store.image} />
        <Card.Content>
          <Card.Header>
            <div className='selectedCardTitle'>{store.name}</div>
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Speciality: {store.specialty}
            </span>
            <div className='date'>
              Rate: {store.rate}
            </div>
          </Card.Meta>
          <Card.Description>
            <div className='detailSegment'>{store.bio}</div>
            <div className='detailSegment'>Restuarant: {store.restuarant}</div>
            <div className='detailSegment'><Icon name='empty star'/>Rating: {store.rating}</div>
            <div className='detailSegment'><Icon name='calendar'/> Avalability: Calendar thing here </div>
            <div className='detailSegment'><Icon name='map outline'/> Menu: menu rendered here</div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <span><Icon name='food'/>Years experience: {store.experience}</span>
            <Link to='/conversation' onClick={() => { props.selectConversation(store); }}><div style={{ textAlign: 'center' }}>Send a message!</div></Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

function mapStateToProps(state) {
  return { selectedChefReducer: state.selectedChefReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectConversation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedChef);
