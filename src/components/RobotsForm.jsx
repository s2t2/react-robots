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
        bot: this.getRobot(this.props.params)
      };
    },

    componentWillMount: function(){
      console.log("FORM WILL MOUNT", this.state.bot);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM WILL RECEIVE PROPS");
      this.setState({
        bot: this.getRobot(nextProps.params)
      });
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM WILL UPDATE", nextState.bot);
    },

    //
    // MY FUNCTIONS
    //

    getRobot: function(paramz){
      var bot = {name: "my bot", description: "does stuff"};
      if (paramz.id) {
        bot = {name: "bot #"+paramz.id, description:"todo: look this up!"} //TODO: database call
      };
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
      console.log("FORM SUBMIT", this.state.bot); //TODO: database call
      this.props.router.push('/');
    }
  })
);

module.exports = RobotsForm;
