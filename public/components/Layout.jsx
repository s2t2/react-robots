import React from 'react';

import Flash from './Flash.jsx';
import Header from './Header.jsx';
import PageHeader from './PageHeader.jsx';
import Footer from './Footer.jsx';

var Layout = React.createClass({
  render: function(){
    var component = this;
    var childrenWithProps = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {setPageTitle: component.setPageTitle});
    });

    return (
      <div>
        <Flash flashHash={this.state.flash} removeFromFlash={this.removeFromFlash}/>
        <Header title="Robots App!" />
        <PageHeader pageTitle={this.state.pageTitle} />
        {childrenWithProps}
        <hr style={{marginTop: '2em'}} />
        <Footer repoUrl="https://github.com/s2t2/react-robots/network" />
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
    return ({
      flash: this.emptyFlash,
      pageTitle: "Placeholder Page Title"
    })
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
  // PAGE TITLE
  //

  setPageTitle: function(newTitle){
    //console.log("CURRENT PAGE TITLE", this.state.pageTitle)
    if(this.state.pageTitle != newTitle){ //<-- prevents an infinite loop of component refreshes
      console.log("SETTING PAGE TITLE", newTitle);
      this.setState({pageTitle: newTitle});
    } else {
      console.log("NOT SETTING PAGE TITLE")
    }
  },

  //
  // FLASH
  //

  // @param [String] strategy Indicate whether you want to compile flash using the "MERGE" or "OVERWRITE" strategy.
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
  // @param [Object] partialFlash
  // @return [FlashHash]
  fullFlash: function(partialFlash){
    return {
      warning: partialFlash.warning || [],
      danger: partialFlash.danger || [],
      success: partialFlash.success || [],
      info: partialFlash.info || []
    };
  },

  // Merges the second flash into the first. Appends new flash message(s) to the first flash.
  // @param [FlashHash] flash
  // @param [Object] proposedFlash
  // @return [FlashHash]
  mergeFlashes: function(flash, proposedFlash){
    return {
      warning: flash.warning.concat(proposedFlash.warning),
      danger: flash.danger.concat(proposedFlash.danger),
      success: flash.success.concat(proposedFlash.success),
      info: flash.info.concat(proposedFlash.info),
    }
  },

  // Remove a given flash message from state.
  // @param [Object] messageParams
  // @param [Object] messageParams [String] messageType The name of the message's contextual array (e.g. "danger", "alert", "warning", or "info").
  // @param [Object] messageParams [String] messageIndex The message's index within its contextual array.
  // @example removeFromFlash({messageType: "danger", messageindex: 0})
  removeFromFlash: function(messageParams){
    console.log("REMOVE FROM FLASH", messageParams.messageType, messageParams.messageIndex)
    var flash = this.state.flash;
    flash[messageParams.messageType].splice(messageParams.messageIndex, 1);
    this.setState({flash: flash});
  }
});

module.exports = Layout;
