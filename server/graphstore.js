
var fs = require('fs');
var file = __dirname + '/../data/graphs.json';
var thumbnailPath = './assets/generatedThumbnils/';
var thumbnailExportPath = '/generatedThumbnils/';

exports.init = function(){

};

exports.setGraph = function(graph, name){
    var db = readFromFile();
    if(!db){
      db = {};
    }

    db[graph.key] = graph.value;
    writeToFile(db);
    return {key: name, value: graph};
};

exports.getGraph = function(name){
    console.log("looking for canvas: ", name);
    var db = readFromFile();
    return {key: name, value: db[name] };
};

exports.getAllGraphNames = function() {
    var db = readFromFile();
    if(!db) { db = {}; }
    var names = Object.keys(db);

    return names;
}

exports.getThumbnail = function(name) {
  return tPath = thumbnailExportPath + name + '.svg';
}

exports.saveSVG = function(name, xml) {
    var tPath = thumbnailPath + name+'.svg';
    fs.writeFileSync(tPath, xml);
    console.log("Save SVG for:", name);
}

function readFromFile(){
    var json = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return json;
}

function writeToFile(data) {
    fs.writeFileSync(file, JSON.stringify(data));
    console.log("The file was saved!");
}
