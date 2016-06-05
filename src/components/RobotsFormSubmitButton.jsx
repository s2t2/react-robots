import React from 'react';

var RobotsFormSubmitButton = React.createClass({
  render: function(){
    return (
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="submit" className="btn btn-success" onClick={this.clickSubmit}>Submit</button>
        </div>
      </div>
    )
  },

  //
  // EVENT LIFECYCLE
  //

  componentWillMount: function(){
    console.log("FORM SUBMIT WILL MOUNT", this.props.bot)
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("FORM SUBMIT DID RECEIVE PROPS", nextProps.bot)
  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("FORM SUBMIT WILL UPDATE", nextProps.bot)
  },

  //
  // MY FUNCTIONS
  //

  clickSubmit: function(){
    console.log("SUBMIT", this.props.bot)
  }
});

module.exports = RobotsFormSubmitButton;
