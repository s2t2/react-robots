var $ = require('jquery');
import React from 'react';
import { withRouter } from 'react-router';

import RobotsFormInputName from './RobotsFormInputName.jsx';
import RobotsFormInputDescription from './RobotsFormInputDescription.jsx';
import RobotsFormSubmitButton from './RobotsFormSubmitButton.jsx';

var RobotsForm = withRouter (
  React.createClass({
    render: function(){
      return (
        <form className="form-horizontal" onSubmit={this.submitForm}>
          <RobotsFormInputName params={this.props.params} bot={this.state.bot} setName={this.setName}/>
          <RobotsFormInputDescription params={this.props.params} bot={this.state.bot} setDescription={this.setDescription}/>

          <RobotsFormSubmitButton bot={this.state.bot}/>
        </form>
      )
    },

    //
    // EVENT LIFECYCLE
    //

    getInitialState: function() {
      console.log("FORM GET INITIAL STATE");
      return {
        bot: this.getRobot(this.props),
        formAction: this.determineFormAction(this.props)
      };
    },

    componentWillMount: function(){
      console.log("FORM WILL MOUNT", this.state.bot);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM WILL RECEIVE PROPS");
      this.setState({
        bot: this.getRobot(nextProps)
      });
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM WILL UPDATE", nextState.bot);
    },

    //
    // MY FUNCTIONS
    //

    determineFormAction: function(propz){
      console.log("DETERMINING FORM ACTION BASED ON PROPS", propz)
      var formAction = (propz.params && propz.params.id) ? "UPDATE_ROBOT" : "CREATE_ROBOT";
      return formAction;
    },

    getRobot: function(propz){
      console.log("GETTING ROBOT BASED ON PROPS", propz)
      var bot;
      if(propz.location && propz.location.state && propz.location.state.formBot){ // NEW OR EDIT ROBOT - PREVIOUS FORM VALUES
        bot = propz.location.state.formBot;
      } else if (propz.params && propz.params.id) { // EDIT ROBOT - DATABASE VALUES
        bot = {name: "bot #"+propz.params.id, description:"todo: look this up!"} //TODO: database call
      } else { // NEW ROBOT - DEFAULT VALUES
        bot = {name: "my bot", description: "does stuff"}
      }
      return bot;
    },

    setName: function(newName){
      var bot = this.state.bot;
      bot.name = newName;
      console.log("SET ROBOT NAME:", bot);
      this.setState({bot: bot});
    },

    setDescription: function(newDesc){
      var bot = this.state.bot;
      bot.description = newDesc;
      console.log("SET ROBOT DESC:", bot);
      this.setState({bot: bot});
    },

    submitForm: function(event){
      event.preventDefault(); // prevents the redirect route from receiving params (e.g. http://localhost:3000/#/?_k=10eu8m rather than http://localhost:3000/?description=fun+times#/?_k=kua7fi)
      console.log("SUBMITTING FORM DATA", this.state.bot, "WITH ACTION", this.state.formAction);
      switch (this.state.formAction) {
        case "CREATE_ROBOT":
          this.createRobot()
          break;
        case "UPDATE_ROBOT":
          this.updateRobot()
          break;
      };
    },

    createRobot(){
      $.ajax({
        url: "api/robots",
        method: "POST",
        dataType: 'json',
        cache: false,
        data: {
          robotName: this.state.bot.name,
          robotDescription: this.state.bot.description
        },
        success: function(data) {
          console.log("DATA", data);
          this.props.router.push({
            pathname: '/',
            state: {
              flash: {success: ["Created robot #"+data._id]}
            }
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(xhr, status, err);
          var errorMessages = xhr.responseJSON.errors;
          var formBot = xhr.responseJSON.bot;
          this.props.router.push({
            pathname: '/robots/new',
            state: {
              flash: {warning: errorMessages},
              formBot: formBot
            }
          });
        }.bind(this)
      });
    },

    updateRobot(){
      console.log("UPDATING ... TODO")
    }
  })
);

module.exports = RobotsForm;
