var $ = require('jquery');
import React from 'react';
import { withRouter } from 'react-router';

import RobotsTableRow from './RobotsTableRow.jsx';

var RobotsTableBody = withRouter (
  React.createClass({

    getInitialState: function() {
      console.log("TABLE BODY -- INITIAL STATE");
      return {
        robots: []
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
            console.error(xhr, status, err);
            console.log("COULDN'T SET ROBOT");
            this.props.router.push({
              pathname: '/',
              state: {
                robots: [],
                flash: {danger: ["Couldn't find robot #"+paramz.id]}
              }
            });
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
            console.error(xhr, status, err);
            console.log("COULDN'T SET ROBOTS");
            this.props.router.push({
              pathname: '/',
              state: {
                robots: [],
                flash: {danger: ["Couldn't find any robots"]}
              }
            });
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
