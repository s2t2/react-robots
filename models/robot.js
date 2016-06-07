var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var RobotSchema = new Schema(
  {
    name : {
      type: String,
      required: true
    },
    description : {
      type: String,
      required: true
    }
  },
  {
    timestamps: { // include timestamp attributes in the schema and automattically assign values on create and update, respectively
      createdAt: 'created_at', // rename from createdAt
      updatedAt: 'updated_at' // rename from updatedAt
    }
  }
);

RobotSchema.statics.devRobots = [
  {name:"c3po", description:"specializes in language translation"},
  {name:"r2d2", description:"holds a secret message"},
  {name:"bb8",  description:"rolls around"}
];

RobotSchema.statics.testRobots = [
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

module.exports = mongoose.model('Robot', RobotSchema);
