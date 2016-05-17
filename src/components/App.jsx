import React from 'react';
import { Link } from 'react-router';

var App = React.createClass({
  render: function(){
    return (
      <div>
        <p>App</p>
        <ul role="nav">
          <li> <Link to="/robots">Bots</Link> </li>
          <li> <Link to="/robots/1">Bot</Link> </li>
        </ul>
      </div>
    )
  }
});

module.exports = App;
