import React from 'react';

var RobotsForm = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    console.log("FORM WILL RECEIVE PROPS", this.props.params, nextProps.params)
    this.getRobots(nextProps);
  },

  render: function(){
    return (
      <p>
        form here
      </p>
    )
  }
});

module.exports = RobotsForm;
