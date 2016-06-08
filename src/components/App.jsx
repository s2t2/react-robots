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

  flashCompilationStrategy: "OVERWRITE", // indicate desired flash behavior ("MERGE" or "OVERWRITE")

  //
  // EVENT LIFECYCLE
  //

  getInitialState: function(){
    console.log("APP GET INITIAL STATE");
    return ({flash: this.emptyFlash})
  },

  componentDidMount: function(){
    console.log("APP DID MOUNT");
    this.compileFlash(this.flashCompilationStrategy, this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("APP WILL RECEIVE PROPS");
    this.compileFlash(this.flashCompilationStrategy, nextProps);
  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("APP WILL UPDATE");
  },

  componentDidUpdate: function(prevProps, prevState){
    console.log("APP DID UPDATE");
  },

  //
  // MY FUNCTIONS
  //

  // @params [String] strategy Indicate whether you want to compile flash using the "MERGE" or "OVERWRITE" strategy.
  compileFlash: function(strategy, propz){
    switch (strategy) {
      case "MERGE":
        this.setFlash(propz);
        break;
      case "OVERWRITE":
        this.overwriteFlash(propz);
        break;
      default:
        console.log("FLASH COMPILATION ERROR")
    };
  },

  // Set flash message state using merge strategy.
  setFlash: function(propz){
    if (propz && propz.location && propz.location.state && propz.location.state.flash){
      var propsFlash = this.fullFlash(propz.location.state.flash);
      var newFlash = this.mergeFlashes(this.state.flash, propsFlash);
      console.log("SETTING FLASH", newFlash);
      this.setState({flash: newFlash});
    } else {
      console.log("NOT SETTING FLASH");
    }
  },

  // Set flash message state using overwrite strategy. Overwrites the existing flash hash with new flash message(s).
  overwriteFlash: function(propz){
    if (propz && propz.location && propz.location.state && propz.location.state.flash){
      var newFlash = this.fullFlash(propz.location.state.flash);
      console.log("OVERWRITING FLASH", newFlash);
      this.setState({flash: newFlash});
    } else {
      console.log("WRITING FLASH");
      this.setState({flash: this.emptyFlash}); // clear the flash when navigating to a new page
    }
  },

  // Converts partial flash (i.e. not having all expected keys) into fully-formed flash (a.k.a. a "FlashHash")
  // @params [Object] partialFlash
  // @returns [FlashHash]
  fullFlash: function(partialFlash){
    var warning = (partialFlash.warning) ? partialFlash.warning : [];
    var danger = (partialFlash.danger) ? partialFlash.danger : [];
    var success = (partialFlash.success) ? partialFlash.success : [];
    var info = (partialFlash.info) ? partialFlash.info : [];
    return {warning: warning, danger: danger, success: success, info: info};
  },

  // Merges the second flash into the first. Appends new flash message(s) to the first flash.
  // @params [FlashHash] flash
  // @params [Object] proposedFlash
  // @returns [FlashHash]
  mergeFlashes: function(flash, proposedFlash){
    return {
      warning: flash.warning.concat(proposedFlash.warning),
      danger: flash.danger.concat(proposedFlash.danger),
      success: flash.success.concat(proposedFlash.success),
      info: flash.info.concat(proposedFlash.info),
    }
  },

  // Remove a given flash message from state.
  // @params [Object] messageParams
  // @params [Object] messageParams [String] messageType The name of the message's contextual array (e.g. "danger", "alert", "warning", or "info").
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
