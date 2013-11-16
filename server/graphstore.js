exports.init = function(){

};

exports.setGraph = function(graph){
    writeToFile(graph);
    return readFromFile();
};

exports.getGraph = function(){
    return readFromFile();
};


var fs = require('fs');

var file = __dirname + '/../data/graphs.json';
function readFromFile(){
    var json = JSON.parse(fs.readFileSync(file, 'utf-8'));
    console.log('read: ', json);
    return json;
}

function writeToFile(data) {
    fs.writeFileSync(file, JSON.stringify(data));
    console.log("The file was saved!");
}
