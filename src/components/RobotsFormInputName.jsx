import React from 'react';
import { withRouter } from 'react-router';

import {getRobot} from '../helpers/RobotsFormHelper.js';

var RobotsFormInputName = withRouter (
  React.createClass({

    getInitialState: function() {
      console.log("FORM NAME - INITIAL STATE", this.state, this.props.params);
      return {
        bot: getRobot(this.props.params)
      };
    },

    componentWillMount: function(){
      console.log("FORM NAME -- WILL MOUNT", this.state);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM NAME -- RECEIVE PROPS", this.state);
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM NAME -- WILL UPDATE", nextState);
    },

    changeName(){
      console.log("CHANGE NAME", this.state);
      var bot = this.state.bot;
      bot.name = this.refs.robotNameRef.value;
      console.log("SET ROBOT NAME:", bot);
      this.setState({bot: bot});
    },

    render: function(){
      return (
        <div className="form-group">
          <label for="robotName" className="col-sm-2 control-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="robotName" ref="robotNameRef" placeholder="My Robot" value={this.state.bot.name} onChange={this.changeName}/>
          </div>
        </div>
      )
    }
  })
);

module.exports = RobotsFormInputName;
