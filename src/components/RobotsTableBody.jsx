var $ = require('jquery');
import React from 'react';
import { withRouter } from 'react-router';

import RobotsTableRow from './RobotsTableRow.jsx';

var RobotsTableBody = withRouter (
  React.createClass({

    getInitialState: function() {
      console.log("TABLE BODY -- INITIAL STATE");
      return {robots: []};
    },

    componentWillMount: function(){
      console.log("TABLE BODY -- WILL MOUNT");
    },

    componentDidMount: function(){
      console.log("TABLE BODY -- DID MOUNT");
      this.getRobots(this.props.params);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("TABLE BODY -- RECEIVE PROPS", nextProps.params)
      this.getRobots(nextProps.params)
    },

    componentWillUpdate: function(nextProps, nextState) {
      console.log("TABLE BODY -- WILL UPDATE", nextProps.params, nextState.flash);
    },

    getRobots: function(paramz){
      console.log("GET ROBOTS");
      if(paramz.id){
        $.ajax({
          url: '/api/robots/'+paramz.id,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({robots: [data]}); // wrap the robot in an empty array to facilitate array mapping
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            this.setState({
              flash: {
                danger: ["COULDN'T FIND ROBOT #"+paramz.id]
              }
            });
            this.props.router.push("/");
          }.bind(this)
        });
      } else {
        $.ajax({
          url: '/api/robots',
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({robots: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
            this.setState({
              flash: {
                danger: ["COULDN'T FIND ROBOTS"]
              }
            });
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
