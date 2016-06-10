var $ = require('jquery');
var moment = require('moment-timezone');
import React from 'react';
import { Link, withRouter } from 'react-router';

var RobotsTableRow = withRouter (
  React.createClass({
    render: function(){
      var robot = this.props.robot;
      return (
        <tr>
          <td>{robot._id}</td>
          <td><Link to={'/robots/'+robot._id}>{robot.name}</Link></td>
          <td>{robot.description}</td>
          <td>{ moment(robot.created_at).tz(moment.tz.guess(robot.created_at)).format('YYYY-MM-DD [at] HH:mm:ss zz') }</td>
          <td>{ moment(robot.updated_at).tz(moment.tz.guess(robot.updated_at)).format('YYYY-MM-DD [at] HH:mm:ss zz') }</td>
          <td>
            <button className='btn btn-warning' onClick={ this.editRobot.bind(null, robot) }>
              <span className="glyphicon glyphicon-pencil"></span> edit
            </button>
          </td>
          <td>
            <button className='btn btn-danger' onClick={ this.deleteRobot.bind(null, robot._id) }>
              <span className="glyphicon glyphicon-trash"></span> delete
            </button>
          </td>
        </tr>
      )
    },

    //
    // MY FUNCTIONS
    //

    editRobot: function(robot){
      var robotId = robot._id;
      console.log("EDIT ROBOT #", robotId);
      this.props.router.push({
        pathname: '/robots/'+robotId+'/edit',
        state: {
          showBot: robot
        }
      });
    },

    deleteRobot: function(robotId){
      var requestUrl = '/api/robots/'+robotId+"/destroy";
      console.log("AJAX REQUEST", requestUrl);
      $.ajax({
        url: requestUrl,
        method: "POST",
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.props.router.push({
            pathname: '/',
            state: {flash: {success: ["Deleted robot #"+robotId]}}
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(xhr, status, err);
          this.props.router.push({
            pathname: '/',
            state: {flash: {danger: ["Couldn't delete robot #"+robotId]}}
          });
        }.bind(this)
      });
    }
  })
);

module.exports = RobotsTableRow;
