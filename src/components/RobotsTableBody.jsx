var $ = require('jquery');
import React from 'react';
import RobotsTableRow from './RobotsTableRow.jsx';

var RobotsTableBody = React.createClass({

  getInitialState: function() {
    console.log("TABLE BODY -- INITIAL STATE");
    return {robots: []};
  },

  componentWillMount: function(){
    console.log("TABLE BODY -- WILL MOUNT");
  },

  componentDidMount: function(){
    console.log("TABLE BODY -- DID MOUNT");
    //var robots = this.getRobots(this.props.params);
    //this.setState({robots: robots});
    this.getRobots(this.props.params);
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("TABLE BODY -- RECEIVE PROPS")
    //var robots = this.getRobots(nextProps.params);
    //this.setState({robots: robots});
    this.getRobots(nextProps.params)
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.log("TABLE BODY -- WILL UPDATE");
  },

  getRobots: function(paramz){
    console.log("GET ROBOTS");
    if(paramz.id){
      //selectedRobots = this.robots.filter(function(r){ return r.id == paramz.id; })

      $.ajax({
        url: '/api/robots/'+paramz.id,
        dataType: 'json',
        cache: false,
        success: function(data) {
          //return data //this.setState({comments: data});
          this.setState({robots: [data]}); // wrap the robot in an empty array to facilitate array mapping
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
          this.setState({robots: []});
        }.bind(this)
      });

    } else {
      //selectedRobots = this.robots

      $.ajax({
        url: '/api/robots',
        dataType: 'json',
        cache: false,
        success: function(data) {
          //return data //this.setState({comments: data});
          this.setState({robots: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
          this.setState({robots: []});
        }.bind(this)
      });

    };
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
