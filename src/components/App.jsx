import React from 'react';

import Flash from './Flash.jsx';
import Header from './Header.jsx';
import PageHeader from './PageHeader.jsx';
import Footer from './Footer.jsx';

var App = React.createClass({
  render: function(){

    return (
      <div>
        <Flash flashHash={this.state.flash}/>
        <Header title="Robots App!" />
        <PageHeader title="Robots" />
        {this.props.children}
        <hr style={{marginTop: '2em'}} />
        <Footer repoUrl="https://github.com/s2t2/react-robots" />
      </div>
    )
  },

  getInitialState: function(){
    console.log("APP -- INITIAL STATE");
    return (
      {
        flash: {
          //warning: ["this is a flash message"],
          //danger: ["dangerous", "duo"],
          //success: ["awesome", "hero"],
          //info: []
        }
      }
    )
  },

  componentDidMount: function(){
    console.log("APP -- DID MOUNT", this.props, this.state);
    if(this.props.location.state){
      console.log("APP -- SET FLASH", this.props.location.state.flash)
      this.setState({
        flash: this.props.location.state.flash
      })
    }

  },

  componentWillReceiveProps: function(nextProps) {
    console.log("APP -- RECEIVE PROPS", nextProps )
    if (nextProps.location.state){
      console.log("APP -- SET FLASH", nextProps.location.state.flash)
      this.setState({
        flash: nextProps.location.state.flash
      })
    }
  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("APP WILL UPDATE", nextProps, nextState)
  },
});

module.exports = App;
