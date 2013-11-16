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

var graphstore = require('./server/graphstore')

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

app.get('/getGraph', function(req, res, next){
    var graph = graphstore.getGraph();
    var result = createClientResponse(graph);
    console.log('/getGraph: ', result)
    res.json(200, result);
});

app.post('/setGraph', function(req, res){
    console.log('/setGraph(req.body): ', req.body)
    var graph = graphstore.setGraph(req.body);
    var result = createClientResponse(graph);
    console.log('/setGraph(result): ', result)
    res.json(200, result);
});

app.get('/editor', function(request, response, next) {
    response.render('editor');
});

function createClientResponse(graph) {
    return graph;
}

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);

//graphstore.setGraph(1, { objects: [], background: ""} );