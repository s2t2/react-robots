import React from 'react'

var PageHeader = React.createClass({
  render: function(){
    return (
      <h2>{this.props.pageTitle}</h2>
    )
  }
});

module.exports = PageHeader;
