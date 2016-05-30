import React from 'react';
import { withRouter } from 'react-router';

import {getRobot} from '../helpers/RobotsFormHelper.js';

var RobotsFormInputDescription = withRouter (
  React.createClass({

    getInitialState: function() {
      console.log("FORM DESC - INITIAL STATE", this.props.params);
      return {
        bot: getRobot(this.props.params)
      };
    },

    componentWillMount: function(){
      console.log("FORM DESC -- WILL MOUNT", this.state);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM DESC -- RECEIVE PROPS", this.state);
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM DESC -- WILL UPDATE", nextState);
    },

    changeDescription(){
      console.log("CHANGE DESC", this.state);
      var bot = this.state.bot;
      bot.description = this.refs.robotDescriptionRef.value;
      console.log("SET ROBOT DESC:", bot);
      this.setState({bot: bot});
    },

    render: function(){
      return (
        <div className="form-group">
          <label for="robotDescription" className="col-sm-2 control-label">Description</label>
          <div className="col-sm-10">
            <textarea className="form-control" rows="3" name="robotDescription" ref="robotDescriptionRef" placeholder="All the things..." value={this.state.bot.description} onChange={this.changeDescription}></textarea>
          </div>
        </div>
      )
    }
  })
);

module.exports = RobotsFormInputDescription;
