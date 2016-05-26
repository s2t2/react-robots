import React from 'react';

var Footer = React.createClass({
  render: function(){
    return (
      <footer>
        <p><a href={this.props.repoUrl}>source</a></p>
      </footer>
    )
  }
});

module.exports = Footer;
