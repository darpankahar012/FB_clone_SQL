var express = require('express');
var bodyParser = require('body-parser');
const logger = require('morgan');



var app = express();
app.use(logger('dev'));
app.use(bodyParser.json())

const db = require('./app/config/db.config.js');

db.sequelize.sync();

// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync with { force: true }');
// });

require('./app/routes/auth.route')(app);
require('./app/routes/post.route')(app);
require('./app/routes/user.route')(app);



var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})