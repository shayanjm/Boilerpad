
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./core/routes')
  , user = require('./core/routes/user')
  , http = require('http')
  , path = require('path');
var config = require('config');
var winston = require('winston');
var logger = new (winston.Logger)({
	transports:[
	new (winston.transports.Console)({ colorize: config.logger.colorize }),
	new (winston.transports.File)({ filename: config.logger.filename })
	]
});

var app = express();

// all environments
app.set('port', process.env.PORT || config.webserver.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  logger.info('Application running on port ' + app.get('port') + ' in ' + app.get('env') + ' mode.');
});
