import React from 'react';

var Flash = React.createClass({
  getInitialState: function(){
    return (
      {
        flash: {
          warning: ["this is a flash message"],
          danger: ["dangerous", "duo"]
        }
      }
    )
  },

  render: function(){
    var component = this;
    console.log(component.state.flash)

    var flashMessages = Object.keys(component.state.flash).map(function(messageType){
      var messages = component.state.flash[messageType];
      console.log("MESSAGES", messageType, messages);

      return (
        messages.map(function(messageContent){
          var messageId = messages.indexOf(messageContent);
          console.log("MESSAGE #"+messageId , messageType, messageContent);

          return (
            <div key={messageType + "-" + messageId} className={"alert alert-" + messageType + " alert-dismissible"} role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              {messageContent}
            </div>
          );
        })
      )
    });

    console.log(flashMessages)

    return (
      <div>
        <p>my flash</p>
        {flashMessages}
      </div>
    )
  }
});

module.exports = Flash;
