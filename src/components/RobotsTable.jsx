import React from 'react';
import { Link } from 'react-router';

var RobotsTable = React.createClass({

  getRobots: function(propz){
    //console.log("GET ROBOTS");
    var robots = [
      {id: 1, name:"c3po", description:"specializes in language translation"},
      {id: 2, name:"r2d2", description:"holds a secret message"},
      {id: 3, name:"bb8",  description:"rolls around"}
    ];

    var selectedRobots = robots;
    var robotId = propz.params.id;
    if (robotId) {
      console.log("ROBOT ID:", robotId);
      selectedRobots = robots.filter(function(r){ return r.id == robotId; })
    };

    this.setState({robots: selectedRobots});
  },

  getInitialState: function() {
    //console.log("GET INITIAL STATE")
    return {robots: []};
  },

  componentWillMount: function(){
    //console.log("COMPONENT WILL MOUNT")
    this.getRobots(this.props);
  },

  //componentDidMount: function(){
  //  console.log("COMPONENT DID MOUNT");
  //},

  componentWillReceiveProps: function(nextProps) {
    //console.log("COMPONENT WILL RECEIVE PROPS", this.props.params, nextProps.params)
    this.getRobots(nextProps);
  },

  //shouldComponentUpdate: function(nextProps, nextState) {
  //  console.log("SHOULD COMPONENT UPDATE", this.state.robots, nextProps, nextState)
  //  //return nextProps.id !== this.props.id;
  //  return true
  //},

  componentWillUpdate: function(nextProps, nextState){
    //console.log("COMPONENT WILL UPDATE")
  },

  //componentDidUpdate: function(nextProps, nextState){
  //  console.log("COMPONENT DID UPDATE", nextProps, nextState)
  //},

  render: function(){
    return (
      <table className="table table-bordered table-hover table-responsive" style={{width:"100%"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.robots.map( function(robot){
              return (
                <tr key={robot.id}>
                  <td><Link to={'/robots/'+robot.id}>{robot.name}</Link></td>
                  <td>{robot.description}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    )
  }
});

module.exports = RobotsTable;
