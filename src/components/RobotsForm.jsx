var $ = require('jquery');
import React from 'react';
import { withRouter } from 'react-router';

import {robotUrl, createRobotUrl} from '../../helpers/api'
import {postRequestOptions, checkStatus, parseJSON, parseError} from '../../helpers/fetch';
import RobotsFormInputName from './RobotsFormInputName.jsx';
import RobotsFormInputDescription from './RobotsFormInputDescription.jsx';
import RobotsFormSubmitButton from './RobotsFormSubmitButton.jsx';

var RobotsForm = withRouter (
  React.createClass({
    render: function(){
      return (
        <form id="robots-form" className="form-horizontal" onSubmit={this.submitForm}>
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
      this.determinePageTitle(this.props.params);
      this.determineRobot(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM WILL RECEIVE PROPS");
      this.determinePageTitle(nextProps.params);
      this.determineRobot(nextProps);
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM WILL UPDATE", nextState.bot);
    },

    //
    // PAGE TITLE FUNCTIONS
    //

    determinePageTitle: function(paramz){
      console.log("DETERMINING PAGE TITLE BASED ON PARAMS", paramz);
      if(paramz.id){
        this.props.setPageTitle("Edit Robot #"+paramz.id);
      } else {
        this.props.setPageTitle("New Robot");
      };
    },

    //
    // FORM FUNCTIONS
    //

    formAction: function(propz){
      console.log("FORM DETERMINING ACTION BASED ON PROPS", propz)
      var formAction = (propz.params && propz.params.id) ? "UPDATE_ROBOT" : "CREATE_ROBOT";
      return formAction;
    },

    determineRobot: function(propz){
      console.log("FORM DETERMINING ROBOT BASED ON PROPS", propz)
      if(propz.location && propz.location.state && propz.location.state.formBot){
        // PREVIOUS FORM VALUES (NEW / EDIT)
        // test this by changing form values to be blank such that they trigger a validation error from the api
        this.setState({bot: propz.location.state.formBot});
      } else if (propz.location && propz.location.state && propz.location.state.showBot) {
        // PREVIOUS SHOW PAGE VALUES (EDIT)
        // test this by clicking on an "edit" button
        this.setState({bot: propz.location.state.showBot});
      } else if (propz.params && propz.params.id) {
        // DATABASE VALUES (EDIT)
        // test this by visiting: http://localhost:3000/#/robots/abc/edit
        this.getRobot(propz.params.id);
      } else {
        // DEFAULT VALUES (NEW)
        // test this by clicking on the "new" button
        this.setState({bot: this.defaultBot});
      }
    },

    getRobot: function(robotId){
      var component = this;
      fetch(robotUrl(robotId))
        .then(checkStatus)
        .then(parseJSON)
        .then(this.setRobot)
        .catch(function(err){
          component.redirectToIndex({danger: ["Couldn't find robot #"+robotId]})
        })
    },

    // expects a partialFlash object (see App.jsx)
    redirectToIndex: function(partialFlash) {
      this.props.router.push({
        pathname: '/',
        state: {
          robots: [],
          flash: partialFlash
        }
      });
    },

    setRobot: function(responseData){
      console.log("REQUEST SUCCESS", responseData);
      this.setState({bot: responseData});
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
      var component = this;
      var requestOptions = postRequestOptions({
        robotName: this.state.bot.name,
        robotDescription: this.state.bot.description
      })
      fetch(createRobotUrl, requestOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(function(json){
          component.redirectToIndex({success: ["Created robot #"+json._id]})
        })
        .catch(function(err){
          err.response.json().then(function(json){
            component.redirectToForm({warning: json.messages}, json.bot)
          })
        })
    },

    redirectToForm: function(partialFlash, formBot){
      this.props.router.push({
        pathname: '/robots/new',
        state: {
          flash: partialFlash,
          bot: formBot
        }
      });
    },

    updateRobot: function(){
      var component = this;
      var requestUrl = "/api/robots/"+this.state.bot._id+"/update";
      console.log("AJAX", requestUrl, "WITH DATA", this.state.bot)
      var requestOptions = postRequestOptions({
        robotName: this.state.bot.name,
        robotDescription: this.state.bot.description
      })
      fetch(requestUrl, requestOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(function(json){
          component.redirectToIndex({success: ["Updated robot #"+json._id]})
        })
        .catch(function(err){
          err.response.json().then(function(json){
            component.props.router.push({
              pathname: '/robots/'+ json.bot._id +'/edit',
              state: {
                flash: {warning: json.messages},
                formBot: json.bot
              }
            }); //component.redirectToEdit({warning: json.messages}, json.bot)
          })
        })
    }
  })
);

module.exports = RobotsForm;
