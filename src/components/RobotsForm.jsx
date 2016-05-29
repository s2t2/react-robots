import React from 'react';
import { withRouter } from 'react-router';

var RobotsForm = withRouter (
  React.createClass({

    getInitialState: function() {
      console.log("FORM - INITIAL STATE")
      return {
        bot: this.getRobot(this.props.params)
      };
    },

    componentWillMount: function(){
      console.log("FORM -- WILL MOUNT")
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM -- RECEIVE PROPS")
      this.setState({
        bot: this.getRobot(nextProps.params)
      })
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM -- WILL UPDATE")
    },

    getRobot(paramz){
      var bot = {name: "my bot", description: "does stuff"}
      if (paramz.id) {
        bot = {name: "bot #"+paramz.id, description:"todo: look this up!"} //TODO: database call
      }
      return bot
    },

    setRobot(){
      var bot = {
        name: this.refs.robotNameRef.value,
        description: this.refs.robotDescriptionRef.value
      }
      console.log("SET ROBOT:", bot);
      this.setState({bot: bot});
    },

    handleChange: function(event){
      this.setRobot();
    },

    handleSubmit: function(event){
      event.preventDefault(); // prevents the redirect route from receiving params (e.g. http://localhost:3000/#/?_k=10eu8m rather than http://localhost:3000/?description=fun+times#/?_k=kua7fi)
      this.setRobot();
      this.props.router.push('/');
    },

    render: function(){
      var component = this; // maybe can remove this if child elements are translated into child components

      return (
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="robotName" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="robotName" ref="robotNameRef" placeholder="My Robot" value={component.state.bot.name} onChange={this.handleChange}/>
            </div>
          </div>

          <div className="form-group">
            <label for="robotDescription" className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10">
              <textarea className="form-control" rows="3" name="robotDescription" ref="robotDescriptionRef" placeholder="All the things..." value={component.state.bot.description} onChange={this.handleChange}></textarea>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-success">Submit</button>
            </div>
          </div>
        </form>
      )
    }
  })
);

module.exports = RobotsForm;
