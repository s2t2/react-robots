import React from 'react';

var PageTitle = React.createClass({
  render: function(){
    return <h2>{this.props.page_title}</h2>
  }
});

module.exports = PageTitle;
