import React from 'react';
import { Grid, Segment, Image } from 'semantic-ui-react';

const MenuListItem = props => (
  <div>
    <div className='miniPadding boxed center'>
      <Segment raised className='whiteBackground'>
        <div style={{ textAlign: 'center' }}>
          <Image src={props.item.pic} size='small'/>
        </div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>Name:</Grid.Column>
            <Grid.Column width={12}>{props.item.menu_name}</Grid.Column>
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
