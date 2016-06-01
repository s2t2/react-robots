import React from 'react';

import RobotsTableRow from './RobotsTableRow.jsx';

var RobotsTableBody = React.createClass({
  robots: [
    {id: 1, name:"c3po", description:"specializes in language translation"},
    {id: 2, name:"r2d2", description:"holds a secret message"},
    {id: 3, name:"bb8",  description:"rolls around"}
  ],

  getInitialState: function() {
    console.log("TABLE BODY -- INITIAL STATE")
    var robots = this.getRobots(this.props.params);
    return {robots: robots};
  },

  componentWillMount: function(){
    console.log("TABLE BODY -- WILL MOUNT")
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("TABLE BODY -- RECEIVE PROPS")
    var robots = this.getRobots(nextProps.params);
    this.setState({robots: robots});
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log("TABLE BODY -- WILL UPDATE");
  },

  getRobots: function(paramz){
    console.log("GET ROBOTS");
    var selectedRobots;
    if(paramz.id){
      selectedRobots = this.robots.filter(function(r){ return r.id == paramz.id; })
    } else {
      selectedRobots = this.robots
    }; //TODO: database call
    return selectedRobots;
  },

  render: function(){
    return (
      <tbody>
        {
          this.state.robots.map( function(robot){
            return (
              <RobotsTableRow key={robot.id} robot={robot}/>
            );
          })
        }
      </tbody>
    )
  }
});

module.exports = RobotsTableBody;
