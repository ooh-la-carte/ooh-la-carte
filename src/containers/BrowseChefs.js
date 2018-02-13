import React, { Component } from 'react';
import { Card, Image, Rating, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { changeSelectedChef } from '../actions';
import Helpers from '../helpers';
import { chefCuisineOptions, budgetOptions, chefRating } from '../formOptions';
import '../style.scss';

class BrowseChefs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chefs: [],
      sorted: [],
      input: '',
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    axios.get('/api/getChefs')
      .then((chefs) => {
        console.log('Chefs: ', chefs.data);
        this.setState({
          chefs: chefs.data,
          sorted: chefs.data,
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = (e, { value }, prop, data) => {
    const sorting = [];
    console.log(value);
    console.log(data);
    if (this.props.sortReducer === 'Rate') {
      if (value === '$') {
        data.forEach((chef) => {
          if (chef[prop] === '$0-$50') {
            sorting.push(chef);
          }
        });
        this.setState({ sorted: sorting });
      } else if (value === '$$') {
        data.forEach((chef) => {
          if (chef[prop] === '$50-$100') {
            sorting.push(chef);
          }
        });
        this.setState({ sorted: sorting });
      } else if (value === '$$$') {
        console.log('here: ', data);
        data.forEach((chef) => {
          console.log(chef[prop]);
          if (chef[prop] === '$100-$200') {
            sorting.push(chef);
          }
        });
        this.setState({ sorted: sorting });
      } else if (value === '$$$$') {
        data.forEach((chef) => {
          if (chef[prop] === '$200+') {
            sorting.push(chef);
          }
        });
        this.setState({ sorted: sorting });
      } else {
        this.setState({ sorted: [] });
      }
    } else if (this.props.sortReducer === 'Rating') {
      if (value === '1') {
        data.forEach((chef) => {
          const parsed = JSON.parse(chef[prop]);
          if (chef[prop] && parsed[0] > 0 && parsed[0] < 2) {
            sorting.push(chef);
          }
        });
        this.setState({ sorted: sorting });
      } else if (value === '2') {
        data.forEach((chef) => {
          const parsed = JSON.parse(chef[prop]);
          if (chef[prop] && parsed[0] >= 2 && parsed[0] < 3) {
            sorting.push(chef);
          }
        });
        this.setState({ sorted: sorting });
      } else if (value === '3') {
        data.forEach((chef) => {
          const parsed = JSON.parse(chef[prop]);
          if (chef[prop] && parsed[0] >= 3 && parsed[0] < 4) {
            sorting.push(chef);
          }
        });
        this.setState({ sorted: sorting });
      } else if (value === '4') {
        data.forEach((chef) => {
          const parsed = JSON.parse(chef[prop]);
          if (chef[prop] && parsed[0] >= 4 && parsed[0] < 5) {
            console.log('got through: ', chef);
            sorting.push(chef);
          }
        });
        this.setState({ sorted: sorting });
      } else if (value === '5') {
        data.forEach((chef) => {
          const parsed = JSON.parse(chef[prop]);
          if (chef[prop] && parsed[0] === 5) {
            sorting.push(chef);
          }
        });
        this.setState({ sorted: sorting });
      } else {
        this.setState({ sorted: [] });
      }
    } else {
      data.forEach((chef) => {
        if (chef[prop] === value.toLowerCase()) {
          sorting.push(chef);
        }
      });
      this.setState({ sorted: sorting });
      console.log('After sorting: ', sorting);
    }
  }

  changeInput = (e) => {
    this.setState({ input: e.target.value });
  }

  handleLocationSubmit = (e) => {
    if (e.which === 13 && this.state.input !== '') {
      this.handleChange(null, { value: this.state.input }, 'city', this.state.chefs);
      this.setState({ input: '' });
    }
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
      {this.props.sortReducer === 'Rate'
        ?
          <div>
            <Dropdown
            value={ this.state.sortValue }
            onChange={(e, value) => { this.handleChange(e, value, 'rate', this.state.chefs); }}
            placeholder='Select rate'
            fluid selection options={budgetOptions} />
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
                  : null
                }
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
      {this.props.sortReducer === 'Rating'
        ?
          <div>
            <Dropdown
            value={ this.state.sortValue }
            onChange={(e, value) => { this.handleChange(e, value, 'rating', this.state.chefs); }}
            placeholder='Select rating range'
            fluid selection options={chefRating} />
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
      {this.props.sortReducer === 'Location'
        ?
          <div>
            <input
            value={ this.state.input }
            onChange={ this.changeInput }
            onKeyPress={ this.handleLocationSubmit }
            placeholder='Find your city!'
            style={{ width: '100%' }}
            />
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
