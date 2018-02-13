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
      city: '',
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

  componentWillReceiveProps = (nextProps) => {
    if (this.props.sortReducer !== nextProps.sortReducer) {
      this.setState({ sorted: this.state.chefs.slice() });
    }
  }

  handleChange = (e, { value }) => {
    let sorting = [];
    const sortField = this.props.sortReducer;
    if (sortField === 'none') {
      sorting = this.state.chefs;
    } else {
      this.state.chefs.forEach((chef) => {
        if (chef[sortField] && chef[sortField].toLowerCase() === value.toLowerCase()) {
          sorting.push(chef);
        }
      });
    }
    this.setState({ sorted: sorting });
  }

  changeCity = (e) => {
    this.setState({ city: e.target.value });
  }

  handleCitySubmit = (e) => {
    if (e.which === 13 && this.state.city !== '') {
      this.handleChange(null, { value: this.state.city }, 'city', this.state.chefs);
      this.setState({ city: '' });
    }
  }

  render = () => {
    let sortDiv;
    if (this.props.sortReducer === 'cuisine') {
      sortDiv = (
        <Dropdown
            value={ this.state.sortValue }
            onChange={this.handleChange}
            placeholder='Select cuisine'
            fluid selection options={chefCuisineOptions} />
      );
    } else if (this.props.sortReducer === 'rate') {
      sortDiv = (
            <Dropdown
            value={ this.state.sortValue }
            onChange={this.handleChange}
            placeholder='Select rate'
            fluid selection options={budgetOptions} />
      );
    } else if (this.props.sortReducer === 'rating') {
      sortDiv = (
            <Dropdown
            value={ this.state.sortValue }
            onChange={this.handleChange}
            placeholder='Select rating range'
            fluid selection options={chefRating} />
      );
    } else if (this.props.sortReducer === 'city') {
      sortDiv = (
            <input
            value={ this.state.city }
            onChange={ this.changeCity }
            onKeyPress={ this.handleCitySubmit }
            placeholder='Find your city!'
            style={{ width: '100%' }}
            />
      );
    }

    return (
    <div className='topLevelDiv center miniPadding profile event'>
    <div>
    {sortDiv}
    </div>
      {this.state.sorted.map(chef => (
        <Card key={chef.id} style= {{ margin: '5% auto' }}
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
          <span className='floatRight'>{chef.rate}</span>
        </Card.Content>
      </Card>
      ))
      }
      <br /> <br />
    </div>
    );
  }
}

function mapStateToProps(state) {
  return { sortReducer: state.sortReducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedChef }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BrowseChefs));
