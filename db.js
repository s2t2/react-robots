var mongoose = require( 'mongoose' );
var mongoConnectionString = process.env.MONGODB_URI || 'mongodb://localhost/react_robots_dev';
mongoose.connect(mongoConnectionString); // establishes a database connection which may in some cases need to be manually closed ... use db.disconnect();

module.exports = mongoose;
