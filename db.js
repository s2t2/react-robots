var mongoose = require( 'mongoose' );

var mongoConnectionString;
if (process.env.MONGODB_URI) {
  mongoConnectionString = process.env.MONGODB_URI;
} else if (process.env.NODE_ENV == "test") {
  mongoConnectionString = 'mongodb://localhost/react_robots_test';
} else {
  mongoConnectionString = 'mongodb://localhost/react_robots_dev';
};

mongoose.connect(mongoConnectionString); // establishes a database connection which may in some cases need to be manually closed ... use db.disconnect();

module.exports = mongoose;
