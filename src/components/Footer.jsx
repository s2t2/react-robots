import React from 'react';
import { Link } from 'react-router';

var Footer = React.createClass({
  render: function(){
    return (
      <footer>
        <p><Link to={this.props.repoUrl}>source</Link></p>
      </footer>
    )
  }
});

module.exports = Footer;
