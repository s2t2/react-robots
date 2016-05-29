import React from 'react';
import { Link, withRouter } from 'react-router';
var moment = require('moment-timezone');

var RobotsTable = withRouter (
  React.createClass({
    robots: [
      {id: 1, name:"c3po", description:"specializes in language translation"},
      {id: 2, name:"r2d2", description:"holds a secret message"},
      {id: 3, name:"bb8",  description:"rolls around"}
    ],

    getInitialState: function() {
      console.log("TABLE -- INITIAL STATE")
      var robots = this.getRobots(this.props);
      return {robots: robots};
    },

    componentWillMount: function(){
      console.log("TABLE -- WILL MOUNT")
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("TABLE -- RECEIVE PROPS", nextProps.params)
      var robots = this.getRobots(nextProps);
      this.setState({robots: robots});
    },

    componentWillUpdate: function(nextProps, nextState) {
      console.log("TABLE -- WILL UPDATE", nextProps.params, nextState);
    },

    getRobots: function(propz){
      var robotId = propz.params.id;
      var selectedRobots = this.robots; //TODO: database call
      if (robotId) { selectedRobots = this.robots.filter(function(r){ return r.id == robotId; }) }; //TODO: database call
      return selectedRobots;
    },

    editRobot: function(robotId){
      console.log("EDIT ROBOT #", robotId);
      this.props.router.push('/robots/'+robotId+'/edit');
    },

    deleteRobot: function(robotId){
      console.log("DELETE ROBOT #", robotId);
      this.props.router.push("/");
    },

    render: function(){
      var component = this; // maybe can remove this if child elements are translated into child components

      return (
        <table className="table table-bordered table-hover table-responsive" style={{width:"100%"}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.robots.map( function(robot){
                return (
                  <tr key={robot.id} data-robot-id={robot.id}>
                    <td>{robot.id}</td>
                    <td><Link to={'/robots/'+robot.id}>{robot.name}</Link></td>
                    <td>{robot.description}</td>
                    <td>{ moment(robot.created_at).tz(moment.tz.guess(robot.created_at)).format('YYYY-MM-DD [at] HH:mm:ss zz') }</td>
                    <td>{ moment(robot.updated_at).tz(moment.tz.guess(robot.updated_at)).format('YYYY-MM-DD [at] HH:mm:ss zz') }</td>
                    <td>
                      <button className='btn btn-warning' onClick={ component.editRobot.bind(null, robot.id) }>
                        <span className="glyphicon glyphicon-pencil"></span> edit
                      </button>
                    </td>
                    <td>
                      <button className='btn btn-danger' onClick={ component.deleteRobot.bind(null, robot.id) }>
                        <span className="glyphicon glyphicon-trash"></span> delete
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      )
    }
  })
)

module.exports = RobotsTable;
