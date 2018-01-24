import React from 'react';
import '../style.scss';
import AppBar from 'material-ui/AppBar';

export default class App extends React.Component {
  
  render () {
    return (
        <div>
          <AppBar
            title="Ooh La Carte"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </div>
    )
  }
}