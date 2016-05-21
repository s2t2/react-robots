import React from 'react';
import { Link } from 'react-router';

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
