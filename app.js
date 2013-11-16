'use strict';

var graphstore = require('./server/graphstore')
graphstore.init();
var graphkey = 1;

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

// For gzip compression
app.use(express.compress());
// logging for dev
app.use(express.logger('dev'));

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

app.get('/getGraph', function(req, res, next){
    var graph = graphstore.getGraph(graphkey);
    res.json(200,createClientResponse(graph));
});

app.post('/setGraph', function(req, res){
    var graph = graphstore.setGraph(graphkey, res.body);
    res.json(200,createClientResponse(graph));
});

app.get('/editor', function(request, response, next) {
    response.render('editor');
});

function createClientResponse(graph) {
    return {
        graph: graph
    };
}

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);

//graphstore.setGraph(1, { objects: [], background: ""} );