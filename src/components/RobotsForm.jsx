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

    defaultBot: {name:"", description:""},

    //
    // EVENT LIFECYCLE
    //

    getInitialState: function() {
      console.log("FORM GET INITIAL STATE");
      return {
        bot: this.defaultBot,
        formAction: this.formAction(this.props)
      };
    },

    componentWillMount: function(){
      console.log("FORM WILL MOUNT", this.state.bot);
    },

    componentDidMount: function(){
      console.log("FORM DID MOUNT", this.state.bot);
      this.determineRobot(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM WILL RECEIVE PROPS");
      this.determineRobot(nextProps);
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM WILL UPDATE", nextState.bot);
    },

    //
    // MY FUNCTIONS
    //

    formAction: function(propz){
      console.log("FORM DETERMINING ACTION BASED ON PROPS", propz)
      var formAction = (propz.params && propz.params.id) ? "UPDATE_ROBOT" : "CREATE_ROBOT";
      return formAction;
    },

    determineRobot: function(propz){
      console.log("FORM DETERMINING ROBOT BASED ON PROPS", propz)
      if(propz.location && propz.location.state && propz.location.state.formBot){ // PREVIOUS FORM VALUES (NEW / EDIT)
        this.setState({
          bot: propz.location.state.formBot
        });
      } else if (propz.location && propz.location.state && propz.location.state.showBot) { // PREVIOUS SHOW PAGE VALUES (EDIT)
        this.setState({
          bot: propz.location.state.showBot
        });
      } else if (propz.params && propz.params.id) { // DATABASE VALUES (EDIT)
        this.setRobot(propz.params.id);
      } else { // DEFAULT VALUES (NEW)
        this.setState({
          bot: this.defaultBot
        });
      }
    },

    setRobot: function(robotId){
      var requestUrl = '/api/robots/'+robotId;
      console.log("AJAX REQUEST", requestUrl)
      $.ajax({
        url: requestUrl,
        dataType: 'json',
        cache: false,
        success: function(data) {
          console.log("REQUEST SUCCESS", data);
          this.setState({bot: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log("REQUEST ERROR", xhr, status, err);
          this.props.router.push({
            pathname: '/',
            state: {
              robots: [],
              flash: {danger: ["Couldn't find robot #"+robotId]}
            }
          });
        }.bind(this)
      });
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

    createRobot: function(){
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
          console.log("CREATED DATA", data);
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

    updateRobot: function(){
      var requestUrl = "api/robots/"+this.state.bot._id+"/update";
      console.log("AJAX", requestUrl, "WITH DATA", this.state.bot)
      $.ajax({
        url: requestUrl,
        method: "POST",
        dataType: 'json',
        cache: false,
        data: {
          robotName: this.state.bot.name,
          robotDescription: this.state.bot.description
        },
        success: function(data) {
          console.log("UPDATED DATA", data);
          this.props.router.push({
            pathname: '/',
            state: {
              flash: {success: ["Updated robot #"+data._id]}
            }
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.log("DIDN'T UPDATE DATA", xhr, status, err);
          var errorMessages = xhr.responseJSON.errors;
          var formBot = xhr.responseJSON.bot;
          this.props.router.push({
            pathname: '/robots/'+ formBot._id +'/edit',
            state: {
              flash: {warning: errorMessages},
              formBot: formBot
            }
          });
        }.bind(this)
      });
    }
  })
);

module.exports = RobotsForm;
