import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import '../style.scss';

// {
//     id: 3,
//     name: 'Jason',
//     specialty: 'Chinese',
//     rating: '4.9',
//     bio: 'Taught English in China where I learned to cook authenticate chinese food',
//     menu: ['Pasta', 'Pizza', 'Whatever'],
//     rate: '$24/hr',
//     experience: '7',
//     image: 'https://source.unsplash.com/nvsHAsuFC54',
//   }

class SelectedChef extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const store = this.props.selectedChefReducer;
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
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedChefReducer: state.selectedChefReducer };
}

export default connect(mapStateToProps)(SelectedChef);