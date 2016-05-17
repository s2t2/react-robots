import React from 'react';
import ReactDOM from 'react-dom';

var RobotsTable = React.createClass({
  getInitialState: function() {
    return {robots: []};
  },

  getRobots: function(){
    var robots = [
      {id: 1, name:"c3po", description:"specializes in language translation"},
      {id: 2, name:"r2d2", description:"holds a secret message"},
      {id: 3, name:"bb8",  description:"rolls around"}
    ];
    this.setState({robots: robots});
  },

  componentDidMount: function(){
    this.getRobots();
  },

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
                  <td><a href={'robots/'+robot.id} >{robot.name}</a></td>
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

ReactDOM.render(
  <RobotsTable/>,
  document.getElementById('robots-table')
);
