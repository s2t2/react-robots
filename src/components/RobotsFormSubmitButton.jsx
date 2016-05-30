import React from 'react';
import { withRouter } from 'react-router';

var RobotsFormSubmitButton = withRouter (
  React.createClass({

    //getInitialState: function() {
    //  console.log("FORM SUBMIT - INITIAL STATE", this.state)
    //  return {
    //    bot: this.state.bot
    //  }
    //},

    componentWillMount: function(){
      console.log("FORM SUBMIT -- WILL MOUNT")
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM SUBMIT -- RECEIVE PROPS")
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM SUBMIT -- WILL UPDATE")
    },

    clickSubmit: function(){
      console.log("FORM SUBMIT -- CLICK", this.state)
      //var bot = {
      //  name: this.refs.robotNameRef.value,
      //  description: this.refs.robotDescriptionRef.value
      //}
      //console.log("SET ROBOT:", bot);
      //this.setState({bot: bot});
    },

    render: function(){
      return (
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-success" onClick={this.clickSubmit}>Submit</button>
          </div>
        </div>
      )
    }
  })
);

module.exports = RobotsFormSubmitButton;
