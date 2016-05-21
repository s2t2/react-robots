var $ = require('jquery'); // avoids "Uncaught ReferenceError: $ is not defined"
global.jQuery = require('jquery'); // avoids "Uncaught ReferenceError: jQuery is not defined"
require('bootstrap');// avoids "Uncaught TypeError: $(...).alert is not a function"

console.log("bootstrap flash")

$().alert('close') // closes data-dismiss="alert" http://getbootstrap.com/javascript/#alerts-methods
