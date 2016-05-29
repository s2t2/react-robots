import React from 'react';

var RobotsTableHead = React.createClass({
  render: function(){
    return (
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
    )
  }
});

module.exports = RobotsTableHead;
