import React from 'react';

var Header = React.createClass({
  render: function(){
    return (
      <header>
        <div id="flash-messages"></div>
        <h1><a href="/">React Robots!</a></h1>
        <a type="button" className="btn btn-primary pull-right" href="/robots/new">
          <span className="glyphicon glyphicon-plus"></span> new
        </a>
      </header>
    )
  }
});

module.exports = Header;
