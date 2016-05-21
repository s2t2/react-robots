import React from 'react'

var PageHeader = React.createClass({
  render: function(){
    return (
      <h2>{this.props.title}</h2>
    )
  }
});

module.exports = PageHeader;
