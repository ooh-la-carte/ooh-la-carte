import React, { Component } from 'react';
import { Card, Image, Rating, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { changeSelectedChef } from '../actions';
import Helpers from '../helpers';
import { chefCuisineOptions } from '../formOptions';
import '../style.scss';

class BrowseChefs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chefs: [],
      sorted: [],
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    axios.get('/api/getChefs')
      .then((chefs) => {
        this.setState({
          chefs: chefs.data,
          sorted: chefs.data,
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = (e, { value }, prop, data) => {
    const sorting = [];
    data.forEach((event) => {
      if (event[prop] === value.toLowerCase()) {
        sorting.push(event);
      }
    });
    this.setState({ sorted: sorting });
    console.log('After sorting: ', sorting);
  }

  render = () => (

    <div className='topLevelDiv center miniPadding profile event'>
      {this.props.sortReducer === 'None'
        ?
          this.state.chefs.map(chef => (
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
            <span className=''>
              {chef.rating ?
                <Rating
                  rating = {Helpers.calculateRating(chef.rating).reduce((a, c) => a / c)}
                  maxRating={5}
                /> :
                'no ratings yet'
              }
            </span>
            <span className='eventBudget'>{chef.rate}</span>
          </Card.Content>
        </Card>
        ))
      : null
      }
      {this.props.sortReducer === 'Cuisine'
        ?
          <div>
            <Dropdown
            value={ this.state.sortValue }
            onChange={(e, value) => { this.handleChange(e, value, 'cuisine_type', this.state.chefs); }}
            placeholder='Select cuisine'
            fluid selection options={chefCuisineOptions} />
            {this.state.sorted.map(chef => (
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
              <span className=''>
                {chef.rating ?
                  <Rating
                    rating = {Helpers.calculateRating(chef.rating).reduce((a, c) => a / c)}
                    maxRating={5}
                  /> :
                  'no ratings yet'
                }
              </span>
              <span className='eventBudget'>{chef.rate}</span>
            </Card.Content>
          </Card>
          ))}
        </div>
      : null
      }
    </div>
  )
}

function mapStateToProps(state) {
  return { sortReducer: state.sortReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedChef }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BrowseChefs));
