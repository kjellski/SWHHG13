// Load the library
var nStore = require('nstore');
var data;

// Create a store
var graphs;

exports.init = function(){
    graphs = nStore.new('data/graphs.db', function () {
        console.log('graphs loaded');
    });
};

exports.setGraph = function(graph){
    // Insert a new document with key autokey
    graphs.save(null, graph, function (err) {
        if (err) { throw err; }
        console.log('added: ' + graph);
    });
    return graph;
};

exports.getGraph = function(){
    graphs.all(function (err, results) {
        data = results;
    });
    return data;
};
