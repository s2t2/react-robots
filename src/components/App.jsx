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
          warning: [],
          danger: [],
          success: [],
          info: []
        }
      }
    )
  },

  componentDidMount: function(){
    console.log("APP -- DID MOUNT", this.props, this.state);
    if(this.props.location.state){
      console.log("APP -- SET FLASH", this.props.location.state.flash)
      this.setState({
        flash: {
          warning: this.state.flash.warning.concat(this.props.location.state.flash.warning),
          danger: this.state.flash.danger.concat(this.props.location.state.flash.danger),
          success: this.state.flash.success.concat(this.props.location.state.flash.success),
          info: this.state.flash.info.concat(this.props.location.state.flash.info),
        }
      })
    }

  },

  componentWillReceiveProps: function(nextProps) {
    console.log("APP -- RECEIVE PROPS", nextProps )
    if (nextProps.location.state){
      console.log("APP -- SET FLASH", nextProps.location.state.flash)
      this.setState({
        flash: {
          warning: this.state.flash.warning.concat(nextProps.location.state.flash.warning),
          danger: this.state.flash.danger.concat(nextProps.location.state.flash.danger),
          success: this.state.flash.success.concat(nextProps.location.state.flash.success),
          info: this.state.flash.info.concat(nextProps.location.state.flash.info),
        }
      })
    }
  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("APP WILL UPDATE", nextProps, nextState)
  },
});

module.exports = App;
