var fs = require('fs');
var dir='./assets/editor_images/';
var dirForExport = '/editor_images/';

exports.getImageUrlList = function(){
    return readFromFile();
};

exports.getCategories = function(){
  var files = fs.readdirSync(dir);
  var result = new Array();

  for(var elem in files){
    var stat = fs.statSync(dir+files[elem]);
    if (stat && stat.isDirectory()) {
      result.push(files[elem]); 
    }
  }

  return result;
}

exports.getImageUrlForCategory = function(cat) {
  var files = fs.readdirSync(dir+cat);
  var result = new Array();

  for(var i in files) {
    var stat = fs.statSync(dir+cat+"/"+files[i])
    if(stat && stat.isFile()) {
      if(files[i].charAt(0) != '.'){
        result.push(dirForExport+cat+"/"+files[i]);
      }
    }
  }

  return result;
}


