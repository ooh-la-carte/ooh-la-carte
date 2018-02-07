import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { changeSelectedChef } from '../actions';
import Helpers from '../helpers';
import '../style.scss';

class BrowseChefs extends Component {
  constructor(props) {
    super(props);
    this.state = { chefs: [] };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    axios.get('/api/getChefs')
      .then((chefs) => {
        this.setState({ chefs: chefs.data });
      })
      .catch(err => console.log(err));
  }

  render = () => (

    <div className='topLevelDiv'>
      {this.state.chefs.map(chef => (
        <Card
          key={chef.id} style= {{ margin: '5% auto' }}
          onClick={() => {
          this.props.changeSelectedChef(chef);
          this.props.history.push('/selectedChef');
        }}>
        <Card.Content>
          <Image floated='right' size='mini' src={chef.image} />
          <Card.Header>
            {chef.username}
          </Card.Header>
          <Card.Meta>
            <div>Name: {chef.name}</div>
            <div>Cuisine: {Helpers.getCuisineList(chef.id)}</div>
             {chef.city ?
              <div>{chef.city}, {chef.state}</div>
              : null }
          </Card.Meta>
          <Card.Description>
            <div>{chef.bio}</div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <span className=''>{chef.rating} stars</span>
          <span className='eventBudget'>{chef.rate}</span>
        </Card.Content>
      </Card>
      ))}
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedChef }, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(BrowseChefs));
