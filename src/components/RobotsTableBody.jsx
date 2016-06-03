var $ = require('jquery');
import React from 'react';
import { withRouter } from 'react-router';

import RobotsTableRow from './RobotsTableRow.jsx';

var RobotsTableBody = withRouter (
  React.createClass({

    getInitialState: function() {
      console.log("TABLE BODY -- INITIAL STATE");
      return {
        robots: [],
        flash: {}
      };
    },

    //componentWillMount: function(){
    //  console.log("TABLE BODY -- WILL MOUNT");
    //},

    componentDidMount: function(){
      console.log("TABLE BODY -- DID MOUNT");
      this.getRobots(this.props.params);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("TABLE BODY -- RECEIVE PROPS", nextProps.params)
      this.getRobots(nextProps.params)
    },

    componentWillUpdate: function(nextProps, nextState) {
      console.log("TABLE BODY -- WILL UPDATE -- PARAMS:", nextProps.params, "AND STATE:", nextState);
    },

    getRobots: function(paramz){
      if(paramz.id){
        console.log("GET ROBOT");
        $.ajax({
          url: '/api/robots/'+paramz.id,
          dataType: 'json',
          cache: false,
          success: function(data) {
            console.log("SET ROBOT");
            this.setState({robots: [data]});
          }.bind(this),
          error: function(xhr, status, err) {
            console.log("COULDN'T SET ROBOT");
            this.setState({robots: [], flash: {danger: ["COULDN'T FIND ROBOT #"+paramz.id]}});
            this.props.router.push("/");
          }.bind(this)
        });
      } else {
        console.log("GET ROBOTS");
        $.ajax({
          url: '/api/robots',
          dataType: 'json',
          cache: false,
          success: function(data) {
            console.log("SET ROBOTS")
            this.setState({robots: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.log("COULDN'T SET ROBOTS");
            this.setState({robots: [], flash: {danger: ["COULDN'T FIND ROBOTS"]}});
            this.props.router.push("/");
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
                <RobotsTableRow key={robot._id} robot={robot}/>
              );
            })
          }
        </tbody>
      )
    }
  })
);

module.exports = RobotsTableBody;
