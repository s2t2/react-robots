module.exports = {}

module.exports.productionRobots = [
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"bb8",  description:"rolls around"}
];

module.exports.devRobots = [
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"bb8",  description:"rolls around"}
];

module.exports.defaultRobots = function(){
  //return (process.env.NODE_ENV == 'production') ? this.productionRobots : this.devRobots
  return this.productionRobots
};
