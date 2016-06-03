import React from 'react';

var Flash = React.createClass({
  render: function(){
    var component = this; // temp workaround
    console.log(component.flash)

    return (
      <div>
        <p>my flash</p>
        <p>{this.state.flash.test[0]}</p>
        {
          ["success","info","warning","danger","test"].map(function(alertClassName){
            return (
              <div key={alertClassName} className="alert alert-success alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                {component.state.flash["test"][0]}
              </div>
            );
          })
        }
      </div>
    )
  },

  getInitialState: function(){
    return (
      {
        flash: {
          test: ["this is a flash message"]
        }
      }
    )
  }

  //bootstrapMessages: function(flash){
  //  if(messages){
  //    Object.keys(messages).forEach(function (type) {
  //      messages[type].forEach(function (message) {
  //      <div class="alert alert-<%= type %> alert-dismissible" role="alert">
  //        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//        <%= message %>
  //      </div>
//    })
  //  })
  //}

});

module.exports = Flash;
