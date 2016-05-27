import React from 'react';
import { Link } from 'react-router';
var moment = require('moment-timezone');

var RobotsTable = React.createClass({

  getRobots: function(propz){
    var robots = [
      {id: 1, name:"c3po", description:"specializes in language translation"},
      {id: 2, name:"r2d2", description:"holds a secret message"},
      {id: 3, name:"bb8",  description:"rolls around"}
    ];
    var selectedRobots = robots;
    var robotId = propz.params.id;
    if (robotId) { selectedRobots = robots.filter(function(r){ return r.id == robotId; }) };
    this.setState({robots: selectedRobots});
  },

  getInitialState: function() {
    return {robots: []};
  },

  componentWillMount: function(){
    this.getRobots(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.getRobots(nextProps);
  },

  render: function(){
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
                <tr key={robot.id}>
                  <td>{robot.id}</td>
                  <td><Link to={'/robots/'+robot.id}>{robot.name}</Link></td>
                  <td>{robot.description}</td>
                  <td>{ moment(robot.created_at).tz(moment.tz.guess(robot.created_at)).format('YYYY-MM-DD [at] HH:mm:ss zz') }</td>
                  <td>{ moment(robot.updated_at).tz(moment.tz.guess(robot.updated_at)).format('YYYY-MM-DD [at] HH:mm:ss zz') }</td>
                  <td>
                    <form action={ '/robots/'+robot.id+'/edit' } method='GET'>
                      <button className='btn btn-warning' type='submit'>
                        <span className="glyphicon glyphicon-pencil"></span> edit
                      </button>
                    </form>
                  </td>
                  <td>
                    <form action={ '/robots/'+robot.id+'/destroy' } method='POST'>
                      <button className='btn btn-danger' type='submit'>
                        <span className="glyphicon glyphicon-trash"></span> delete
                      </button>
                    </form>
                  </td>
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
