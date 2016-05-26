import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
  render: function(){
    return (
      <header>
        <div id="flash-messages"></div>

        <h1><Link to="/">{this.props.title}</Link></h1>

        <Link to="/robots/new" type="button" className="btn btn-primary pull-right">
          <span className="glyphicon glyphicon-plus"></span> new
        </Link>
      </header>
    )
  }
});

module.exports = Header;
