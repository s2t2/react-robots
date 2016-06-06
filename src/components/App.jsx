import React from 'react';

import Flash from './Flash.jsx';
import Header from './Header.jsx';
import PageHeader from './PageHeader.jsx';
import Footer from './Footer.jsx';

var App = React.createClass({
  render: function(){
    return (
      <div>
        <Flash flashHash={this.state.flash} removeFromFlash={this.removeFromFlash}/>
        <Header title="Robots App!" />
        <PageHeader title="Robots" />
        {this.props.children}
        <hr style={{marginTop: '2em'}} />
        <Footer repoUrl="https://github.com/s2t2/react-robots" />
      </div>
    )
  },

  emptyFlash: {
    warning: [],
    danger: [],
    success: [],
    info: [],
  },

  testFlash: {
    warning: ["one","two"],
    danger: ["dangerous", "duo"],
    success: ["great"],
    info: [],
  },

  //
  // EVENT LIFECYCLE
  //

  getInitialState: function(){
    console.log("APP GET INITIAL STATE");
    return ({flash: this.testFlash})
  },

  componentDidMount: function(){
    console.log("APP DID MOUNT");
    this.setFlash(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("APP WILL RECEIVE PROPS")
    this.setFlash(nextProps);
  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("APP WILL UPDATE")
  },

  //
  // MY FUNCTIONS
  //

  // todo: re-write
  setFlash: function(propz){
    if (propz.location.state){
      console.log("SETTING FLASH", this.state.flash, propz.location.state.flash)
      var warning = [], danger = [], success = [], info = [];
      if(propz.location.state.flash.warning){
        warning = propz.location.state.flash.warning
      }
      if(propz.location.state.flash.danger){
        danger = propz.location.state.flash.danger
      }
      if(propz.location.state.flash.success){
        success = propz.location.state.flash.success
      }
      if(propz.location.state.flash.info){
        info = propz.location.state.flash.info
      }
      this.setState({
        flash: {
          warning: this.state.flash.warning.concat(warning),
          danger: this.state.flash.danger.concat(danger),
          success: this.state.flash.success.concat(success),
          info: this.state.flash.info.concat(info),
        }
      })
    } else {
      console.log("NOT SETTING FLASH");
    }
  },

  // Remove a given flash message from state.
  // @params [Object] messageParams
  // @params [Object] messageParams [String] messageType The name of the message's contextual array.
  // @params [Object] messageParams [String] messageIndex The message's index within its contextual array.
  // @example removeFromFlash({messageType: "danger", messageindex: 0})
  removeFromFlash: function(messageParams){
    console.log("REMOVE FROM FLASH", messageParams.messageType, messageParams.messageIndex)
    var flash = this.state.flash;
    flash[messageParams.messageType].splice(messageParams.messageIndex, 1);
    this.setState({flash: flash});
  }
});

module.exports = App;
