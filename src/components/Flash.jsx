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
          var messageId = messageType + "-" + messageIndex;
          //console.log("MESSAGE #"+messageId, messageContent);
          return (
            <div key={messageId} className={"alert alert-" + messageType + " alert-dismissible"} role="alert" data-message-id={messageId}>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true" onClick={component.dismissMessage.bind(null, messageId)}>
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

    // remove this element from the document
    //$().alert('close') // closes data-dismiss="alert" http://getbootstrap.com/javascript/#alerts-methods
    var messageDiv = document.querySelector("[data-message-id='" + messageId + "']"); // selector like ... "[data-message-id='warning-0']"
    console.log(typeof messageDiv)
    if (messageDiv){
      console.log("REMOVING", messageId)
      messageDiv.remove(); // this is unnecessary?
    } else {
      console.log("ALREADY REMOVED", messageId)
    }



    // remove this message from the flash
    //this.props.removeFromFlash(messageId)
    //console.log("REMOVING FROM FLASH")

    //this.props.resetFlash();







  }
});

module.exports = Flash;
