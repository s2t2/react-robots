import React from 'react';
import { withRouter } from 'react-router';

import {getRobot} from '../helpers/RobotsFormHelper.js';
import RobotsFormInputName from './RobotsFormInputName.jsx';
import RobotsFormInputDescription from './RobotsFormInputDescription.jsx';
import RobotsFormSubmitButton from './RobotsFormSubmitButton.jsx';

var RobotsForm = withRouter (
  React.createClass({

    getInitialState: function() {
      console.log("FORM - INITIAL STATE")
      return {
        bot: getRobot(this.props.params)
      };
    },

    componentWillMount: function(){
      console.log("FORM -- WILL MOUNT", this.state)
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM -- RECEIVE PROPS")
      this.setState({
        bot: getRobot(nextProps.params)
      })
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM -- WILL UPDATE")
    },

    submitForm: function(event){
      event.preventDefault(); // prevents the redirect route from receiving params (e.g. http://localhost:3000/#/?_k=10eu8m rather than http://localhost:3000/?description=fun+times#/?_k=kua7fi)

      var name = this.refs.robotNameRef.value // Uncaught TypeError: Cannot read property 'value' of undefined
      var desc = this.refs.robotDescriptionRef.value // Uncaught TypeError: Cannot read property 'value' of undefined
      var bot = {
        name: name,
        description: desc
      };
      console.log("SET ROBOT:", bot);
      this.setState({bot: bot});

      console.log("FORM -- SUBMIT", this.state)
      this.props.router.push('/');
    },

    render: function(){
      return (
        <form className="form-horizontal" onSubmit={this.submitForm}>
          <RobotsFormInputName params={this.props.params}/>
          <RobotsFormInputDescription params={this.props.params}/>

          <RobotsFormSubmitButton/>
        </form>
      )
    }
  })
);

module.exports = RobotsForm;
