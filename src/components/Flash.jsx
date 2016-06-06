import React from 'react';

var Flash = React.createClass({
  render: function(){
    var component = this;
    var flash = component.props.flashHash;
    console.log("FLASH", flash)
    var flashMessages = Object.keys(flash).map(function(messageType){
      var messages = flash[messageType];
      //console.log("MESSAGES", messageType, messages);
      return (
        messages.map(function(messageContent){
          var messageIndex = messages.indexOf(messageContent);
          var dismissalParams = {messageType: messageType, messageIndex: messageIndex};
          var messageId = messageType + "-" + messageIndex;
          //console.log("MESSAGE", messageId, messageContent);
          return (
            <div key={messageId} className={"alert alert-" + messageType + " alert-dismissible"} role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true" onClick={component.dismissMessage.bind(null, dismissalParams)}>
                  &times;
                </span>
              </button>
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

  //
  // EVENT LIFECYCLE
  //

  componentDidMount: function(){
    console.log("FLASH DID MOUNT");
  },

  componentWillReceiveProps: function(nextProps){
    console.log("FLASH WILL RECEIVE PROPS");
  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("FLASH WILL UPDATE");
  },

  //
  // MY FUNCTIONS
  //

  dismissMessage: function(messageId){
    console.log("DISMISS MESSAGE", messageId);
    this.props.removeFromFlash(messageId);
  }
});

module.exports = Flash;
