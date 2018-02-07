import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Icon, Image } from 'semantic-ui-react';
import { selectConversation } from '../actions';
import Helpers from '../helpers';
import '../style.scss';

const SelectedChef = (props) => {
  const chef = props.selectedChefReducer;
  return (
    <div className='selectedEventCardDiv'>
      <Card id='selectedEventCard'>
        <Image size='large' src={chef.image} />
        <Card.Content>
          <Card.Header>
            <div className='selectedCardTitle'>{chef.username}</div>
          </Card.Header>
          <Card.Meta>
            <div>Name: {chef.name}</div>
            <div>Cuisine: {Helpers.getCuisineList(JSON.parse(chef.cuisine))}</div>
            <div>Rate: {chef.rate}</div>
             {chef.city ?
              <div>{chef.city}, {chef.state}</div>
              : null }
          </Card.Meta>
          <Card.Description>
            <div className='detailSegment'>{chef.bio}</div>
            <div className='detailSegment'>Restuarant: {chef.restuarant}</div>
            <div className='detailSegment'><Icon name='empty star'/>Rating: {chef.rating}</div>
            <div className='detailSegment'><Icon name='calendar'/> Avalability: Calendar thing here </div>
            <div className='detailSegment'><Icon name='map outline'/> Menu: menu rendered here</div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div>
            <span><Icon name='food'/>Years experience: {chef.experience}</span>
            <div onClick={() => {
              const convo = {
                user: window.localStorage.getItem('userId'),
                chef: chef.id,
              };
              axios.post('/api/conversations', convo)
                .then((results) => {
                  // need convo id here
                  const obj = results.data[0];
                  console.log('Before manipulation: ', obj);
                  obj.convo_id = obj.id;
                  obj.username = chef.username;
                  obj.user_id = obj.chef_id;
                  console.log('Select chef conversation store: ', obj);
                  props.selectConversation(obj);
                })
                .then(() => {
                  props.history.push('/conversation');
                });
            }}><div style={{ textAlign: 'center' }}>Send a message!</div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectedChef));
