import React from 'react';

import Header from './Header.jsx';
import PageHeader from './PageHeader.jsx';
import Footer from './Footer.jsx';

var App = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    console.log("APP WILL RECEIVE PROPS", this.props.params, nextProps.params)
  },

  render: function(){
    return (
      <div>
        <Header title="Robots App!" />
        <PageHeader title="Robots" />
        {this.props.children}
        <hr style={{marginTop: '2em'}} />
        <Footer repoUrl="https://github.com/s2t2/react-robots" />
      </div>
    )
  }
});

module.exports = App;
