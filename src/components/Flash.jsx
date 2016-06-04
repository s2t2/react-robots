import React from 'react';

var Flash = React.createClass({
  render: function(){
    var flash = this.props.flashHash; // this.state.flash
    //console.log("FLASH", flash)
    //var flashMessages = Object.keys(flash).map(function(messageType){
    var flashMessages = Object.keys(flash).map(function(messageType){
      var messages = flash[messageType];
      //console.log("MESSAGES", messageType, messages);
      return (
        messages.map(function(messageContent){
          var messageId = messages.indexOf(messageContent);
          //console.log("MESSAGE #"+messageId , messageType, messageContent);
          return (
            <div key={messageType + "-" + messageId} className={"alert alert-" + messageType + " alert-dismissible"} role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              {messageContent}
            </div>
          );
        })
      )
    });
    return (
      <div>
        {flashMessages}
      </div>
    )
  },

  //getInitialState: function(){
  //  console.log("FLASH -- INITIAL STATE");
  //  return (
  //    {
  //      flash: {
  //        //warning: ["this is a flash message"],
  //        //danger: ["dangerous", "duo"],
  //        //success: ["awesome", "hero"],
  //        //info: []
  //      }
  //    }
  //  )
  //},

  componentDidMount: function(){
    console.log("FLASH -- DID MOUNT", this.props, this.state);
    //if(this.props.location){
    //  this.setState({
    //    flash: this.props.location.state.flash
    //  })
    //}

  },

  componentWillReceiveProps: function(nextProps) {
    console.log("FLASH -- RECEIVE PROPS", nextProps );

    //if (nextProps.location){
    //  this.setState({
    //    flash: nextProps.location.state.flash
    //  })
    //}

  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("FLASH WILL UPDATE", nextProps, nextState)
  }
});

module.exports = Flash;
