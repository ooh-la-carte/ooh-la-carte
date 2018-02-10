import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

const MenuListItem = props => (
  <div>
    <div className='miniPadding boxed center'>
      <Segment className='lightlyColored'>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>Name:</Grid.Column>
            <Grid.Column width={12}>{props.item.dish}</Grid.Column>
            <Grid.Column width={4}>Cuisine:</Grid.Column>
            <Grid.Column width={12}>{props.item.cuisine_type}</Grid.Column>
            <Grid.Column width={4}>Details:</Grid.Column>
            <Grid.Column width={12}>{props.item.description}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  </div>
);

export default MenuListItem;
