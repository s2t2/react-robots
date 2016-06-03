import React from 'react';

import Flash from './Flash.jsx';
import Header from './Header.jsx';
import PageHeader from './PageHeader.jsx';
import Footer from './Footer.jsx';

var App = React.createClass({
  render: function(){
    return (
      <div>
        <Flash />
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
