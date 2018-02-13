import React, { Component } from 'react';
import { Card, Image, Dropdown } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../style.scss';
import { changeSelectedEvent } from '../actions';
import { cuisineOptions, sizeOptions, cityOptions, budgetOptions } from '../formOptions';
// import data from '../MockData';


class BrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      sorted: [],
      sortValue: '',
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    axios.get('/api/events')
      .then((events) => {
        console.log('events data: ', events.data);
        this.setState({
          events: events.data,
          sorted: events.data,
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = (e, { value }, prop, data) => {
    const sorting = [];
    if (this.props.sortReducer === 'Budget') {
      if (value === '$') {
        data.forEach((event) => {
          if (+event.budget > 0 && +event.budget <= 50) {
            sorting.push(event);
          }
        });
        this.setState({ sorted: sorting });
      } else if (value === '$$') {
        data.forEach((event) => {
          if (+event.budget > 50 && +event.budget <= 100) {
            sorting.push(event);
          }
        });
        this.setState({ sorted: sorting });
      } else if (value === '$$$') {
        data.forEach((event) => {
          if (+event.budget > 100 && +event.budget <= 200) {
            sorting.push(event);
          }
        });
        this.setState({ sorted: sorting });
      } else if (value === '$$$$') {
        data.forEach((event) => {
          if (+event.budget > 200) {
            sorting.push(event);
          }
        });
        this.setState({ sorted: sorting });
      } else {
        this.setState({ sorted: [] });
      }
    } else {
      data.forEach((event) => {
        if (event[prop] === value.toLowerCase()) {
          sorting.push(event);
        }
      });
      this.setState({ sorted: sorting });
      console.log('After sorting: ', sorting);
    }
  }

  render = () => (
    <div className='topLevelDiv center miniPadding profile'>
      {this.props.sortReducer === 'Cuisine'
        ?
          <div>
            <Dropdown
            value={ this.state.sortValue }
            onChange={(e, value) => { this.handleChange(e, value, 'cuisine_type', this.state.events); }}
            placeholder='Select cuisine'
            fluid selection options={cuisineOptions} />
            {this.state.sorted.map(event => (
              event.chef_id === null
              ?
                <Card
                  key={event.id}
                  className='eventCard'
                  onClick={() => {
                    console.log('Selected Event store: ', event);
                    this.props.changeSelectedEvent(event);
                    this.props.history.push('/selectedEvent');
                }}>
                  <Card.Content>
                    <Image floated='right' size='mini' src={event.img} />
                    <Card.Header>
                      {event.name} ({event.cuisine_type})
                    </Card.Header>
                    <Card.Meta>
                      <div>{event.creator_username}</div>
                    </Card.Meta>
                    <Card.Description>
                      <div>{event.description}</div>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <span>Size: {event.party_size}</span>
                    <span className='floatRight'>Budget: {event.budget}</span>
                  </Card.Content>
                </Card>
              : null
            ))}
          </div>
        : null
      }
      {this.props.sortReducer === 'Size'
        ?
          <div>
            <Dropdown
            value={ this.state.sortValue }
            onChange={(e, value) => { this.handleChange(e, value, 'party_size', this.state.events); }}
            placeholder='Select party size'
            fluid selection options={sizeOptions} />
            {this.state.sorted.map(event => (
              event.chef_id === null
              ?
                <Card
                  key={event.id}
                  className='eventCard'
                  onClick={() => {
                    console.log('Selected Event store: ', event);
                    this.props.changeSelectedEvent(event);
                    this.props.history.push('/selectedEvent');
                }}>
                  <Card.Content>
                    <Image floated='right' size='mini' src={event.img} />
                    <Card.Header>
                      {event.name} ({event.cuisine_type})
                    </Card.Header>
                    <Card.Meta>
                      <div>{event.creator_username}</div>
                    </Card.Meta>
                    <Card.Description>
                      <div>{event.description}</div>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <span>Size: {event.party_size}</span>
                    <span className='floatRight'>Budget: {event.budget}</span>
                  </Card.Content>
                </Card>
              : null
            ))}
          </div>
        : null
      }
      {this.props.sortReducer === 'Location'
        ?
          <div>
            <Dropdown
            value={ this.state.sortValue }
            onChange={(e, value) => { this.handleChange(e, value, 'city', this.state.events); }}
            placeholder='Select a city'
            fluid selection options={cityOptions} />
            {this.state.sorted.map(event => (
              event.chef_id === null
              ?
                <Card
                  key={event.id}
                  className='eventCard'
                  onClick={() => {
                    console.log('Selected Event store: ', event);
                    this.props.changeSelectedEvent(event);
                    this.props.history.push('/selectedEvent');
                }}>
                  <Card.Content>
                    <Image floated='right' size='mini' src={event.img} />
                    <Card.Header>
                      {event.name} ({event.cuisine_type})
                    </Card.Header>
                    <Card.Meta>
                      <div>{event.creator_username}</div>
                    </Card.Meta>
                    <Card.Description>
                      <div>{event.description}</div>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <span>Size: {event.party_size}</span>
                    <span className='floatRight'>Budget: {event.budget}</span>
                  </Card.Content>
                </Card>
              : null
            ))}
          </div>
        : null
      }
      {this.props.sortReducer === 'Budget'
        ?
          <div>
            <Dropdown
            value={ this.state.sortValue }
            onChange={(e, value) => { this.handleChange(e, value, 'budget', this.state.events); }}
            placeholder='Select a budget'
            fluid selection options={budgetOptions} />
            {this.state.sorted.map(event => (
              event.chef_id === null
              ?
                <Card
                  key={event.id}
                  className='eventCard'
                  onClick={() => {
                    console.log('Selected Event store: ', event);
                    this.props.changeSelectedEvent(event);
                    this.props.history.push('/selectedEvent');
                }}>
                  <Card.Content>
                    <Image floated='right' size='mini' src={event.img} />
                    <Card.Header>
                      {event.name} ({event.cuisine_type})
                    </Card.Header>
                    <Card.Meta>
                      <div>{event.creator_username}</div>
                    </Card.Meta>
                    <Card.Description>
                      <div>{event.description}</div>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <span>Size: {event.party_size}</span>
                    <span className='floatRight'>Budget: {event.budget}</span>
                  </Card.Content>
                </Card>
              : null
            ))}
          </div>
        : null
      }
      {this.props.sortReducer === 'None'
        ?
          this.state.events.map(event => (
            event.chef_id === null
            ?
              <Card
                key={event.id}
                className='eventCard'
                onClick={() => {
                  console.log('Selected Event store: ', event);
                  this.props.changeSelectedEvent(event);
                  this.props.history.push('/selectedEvent');
              }}>
                <Card.Content>
                  <Image floated='right' size='mini' src={event.img} />
                  <Card.Header>
                    {event.name} ({event.cuisine_type})
                  </Card.Header>
                  <Card.Meta>
                    <div>{event.creator_username}</div>
                  </Card.Meta>
                  <Card.Description>
                    <div>{event.description}</div>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <span>Size: {event.party_size}</span>
                  <span className='floatRight'>Budget: {event.budget}</span>
                </Card.Content>
              </Card>
            : null
          ))
        : null
      }
      <br /> <br />
    </div>
  );
}

function mapStateToProps(state) {
  return { sortReducer: state.sortReducer };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BrowseEvents));

