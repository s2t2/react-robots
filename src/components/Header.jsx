import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
  render: function(){
    return (
      <header>
        <div id="flash-messages"></div>
        <h1> <Link to="/">{this.props.title}</Link></h1>
        <a type="button" className="btn btn-primary pull-right" href="/robots/new">
          <span className="glyphicon glyphicon-plus"></span> new
        </a>
      </header>
    )
  }
});

module.exports = Header;
