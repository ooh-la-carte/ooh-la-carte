import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { changeSelectedChef } from '../actions';
import '../style.scss';
import data from '../MockData';

const BrowseChefs = props => (
    <div className='topLevelDiv'>
      {data.chefs.map(chef => (
        <Link key={chef.id} to='/selectedChef'>
          <Card
          className='browseEventCards'
          onClick={() => { props.changeSelectedChef(chef.id); }}>
            <Card.Content>
              <Image floated='right' size='mini' src={chef.image} />
              <Card.Header>
                {chef.name}
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
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSelectedChef }, dispatch);
}

export default connect(null, mapDispatchToProps)(BrowseChefs);
