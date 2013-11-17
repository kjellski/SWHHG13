'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;

/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

var graphstore = require('./server/graphstore');
var imageloader = require('./server/imageloader');


// For gzip compression
app.use(express.compress());
// logging for dev
app.use(express.logger('dev'));
app.use(express.bodyParser());

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');

/*
 * Routes
 */
// Index Page
app.get('/', function(request, response, next) {
    response.render('index');
});

app.get('/getGraph/:name', function(req, res, next){
    console.log("server in getGraph for: ", req.params.name);
    var graph = graphstore.getGraph(req.params.name);
    var result = graph;
    console.log('/getGraph: ', result)
    res.json(200, result);
});

app.get('/getGraphNames', function(req, res, next) {
  var names = graphstore.getAllGraphNames();
  res.json(200, names);
      });

app.post('/setGraph', function(req, res){
    console.log('/setGraph(req.body): ', req.body)
    var graph = graphstore.setGraph(req.body);
    var result = graph;
    console.log('/setGraph(result): ', result)
    res.json(200, result);
});

app.get('/editor', function(request, response, next) {
    response.render('editor');
});

app.get('/editor/images/:cat', function(request, response, next) {
  response.json(200, imageloader.getImageUrlForCategory(request.params.cat));
});


app.get('/editor/categories', function(request, response, next) {
   response.json(200, imageloader.getCategories());
});

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);

