import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { changeSelectedChef } from '../actions';
import '../style.scss';

class BrowseChefs extends Component {
  constructor(props) {
    super(props);

    this.state = { chefs: [] };
  }

  componentDidMount = () => {
    axios.get('/api/getChefs')
      .then((chefs) => {
        console.log(chefs.data);
        this.setState({ chefs: chefs.data });
      })
      .catch(err => console.log(err));
  }

  render = () => (
      <div className='topLevelDiv'>
        {this.state.chefs.map(chef => (
          <Link key={chef.id} to='/selectedChef'>
            <Card
            className='browseEventCards'
            onClick={() => { this.props.changeSelectedChef(chef); }}>
              <Card.Content>
                <Image floated='right' size='mini' src={chef.image} />
                <Card.Header>
                  {chef.username}
                </Card.Header>
                <Card.Meta>
                  <div>Cuisine: {chef.specialty}</div>
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
          </Link>
        ))}
      </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedChef }, dispatch);
}

export default connect(null, mapDispatchToProps)(BrowseChefs);
