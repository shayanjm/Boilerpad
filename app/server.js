var express = require('express');         // Express
var app     = module.exports = express(), // Main application
    path    = require('path'),
    pub;                                  // Public directory

console.log('wat');

// Set public directory according to public environment settings or built dir
pub = path.join(process.cwd(), (process.env.PUBLIC || '/public-built'));

// General configuration
app.configure(function(){
  app.set('views', process.cwd() + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(pub));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', function(req, res) {
    res.render('index');
});

// // redirect all others to the index (HTML5 history)
// app.get('*', function(req, res) {
//     res.render('index');
// });

// Start server
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
