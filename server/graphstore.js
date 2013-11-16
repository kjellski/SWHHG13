// Load the library
var nStore = require('nstore');
var data;
var queryable = false;
var graphs;

exports.init = function(){
    graphs = nStore.new('data/graphs.db', function () {
        queryable = true;
        console.log('graphs loaded');
    });
};

exports.setGraph = function(key, graph){
    if (queryable) {

        // Insert a new document with key autokey
        graphs.save(key, graph, function (err) {
            if (err) { throw err; }
            console.log('added: ' + graph);
        });

    } else { throw Exception(); }

    return graph;
};

exports.getGraph = function(key){
    console.log(graphs);
    graphs.all(function (err, results) {
        data = results;
    });
    return data;
};
