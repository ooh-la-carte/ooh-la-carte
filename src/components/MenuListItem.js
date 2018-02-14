import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setMenu } from '../actions';
import { Grid, Segment, Image, Divider, Form, Button } from 'semantic-ui-react';

class MenuListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_name: '',
      type: '',
      price: '',
      description: '',
      pic: '',
      editOpen: false,
    };
  }

  openEditForm = (item) => {
    if (!this.state.editOpen) {
      console.log(item);
      this.setState({
        menu_name: item.menu_name,
        type: item.cuisine_type,
        price: item.price,
        description: item.description,
        pic: item.pic,
        editOpen: !this.state.editOpen,
      });
    } else {
      this.setState({
        menu_name: '',
        type: '',
        price: '',
        description: '',
        pic: '',
        editOpen: !this.state.editOpen,
      });
    }
  };

  editMenuItem = (item) => {
    this.setState({ editOpen: !this.state.editOpen });
    axios.post('/api/user/editMenuItem', {
      id: item.id,
      menu_name: this.state.menu_name,
      pic: this.state.pic,
      description: this.state.description,
      cuisine_type: this.state.type,
    })
      .then(() => {
        axios.get('/api/user/menus', { params: { id: window.localStorage.getItem('userId') } })
          .then((menuItems) => {
            this.props.setMenu(menuItems.data);
          });
      });
  }

  handleUpdate = (e, { type, value }) => this.setState({ [type]: value })

  render = () => (
        <div>
          <div className='miniPadding boxed center'>
            <Segment raised className='whiteBackground'>
              <div className='cardHolder'>
                <Image src={this.props.item.pic} size='small'/>
              </div>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>Name:</Grid.Column>
                  <Grid.Column width={12}>{this.props.item.menu_name}</Grid.Column>
                  <Grid.Column width={4}>Cuisine:</Grid.Column>
                  <Grid.Column width={12}>{this.props.item.cuisine_type}</Grid.Column>
                  <Grid.Column width={4}>Details:</Grid.Column>
                  <Grid.Column width={12}>{this.props.item.description}</Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider />
              {window.localStorage.getItem('isChef') === 'true'
                ? <div
                className='centerText'
                style={{ color: 'gray' }}
                onClick={() => { this.openEditForm(this.props.item); }}>Edit</div>
                : null
              }
              {this.state.editOpen
                ?
                  <Segment className='standardWidth'>
                    <Form className='boxed center' onSubmit={() => {
                      this.openEditForm();
                      this.editMenuItem(this.props.item);
                    }}>
                        <Form.Field>
                          <label>Menu name</label>
                          <Form.Input placeholder='Menu name' onChange={this.handleUpdate} type='menu_name' value={this.state.menu_name}/>
                        </Form.Field>
                        <Form.Field style={{ width: '50%' }}>
                          <label>Cuisine / Theme</label>
                          <Form.Input placeholder='Cuisine / Theme' onChange={this.handleUpdate} type='type' value={this.state.type}/>
                        </Form.Field>
                        <Form.Field>
                          <label>Description</label>
                          <Form.Input placeholder='Description' onChange={this.handleUpdate} type='description' value={this.state.description}/>
                        </Form.Field>
                        <Form.Field>
                          <label>Picture</label>
                          <Form.Input placeholder='picture URL' onChange={this.handleUpdate} type='pic' value={this.state.pic}/>
                        </Form.Field>
                        <Button className='btn' type='submit'>Save!</Button><Button onClick={this.openEditForm}>Cancel</Button>
                      </Form>
                  </Segment>
                : null
              }
            </Segment>
          </div>
        </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setMenu }, dispatch);
}

export default connect(null, mapDispatchToProps)(MenuListItem);
