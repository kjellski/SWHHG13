var fs = require('fs');

imageloader.getImageUrlList = function(){
    return readFromFile();
};

imageloader.setGraph = function(graph){
var dir='./tmpl/';
var data={};

fs.readdir(dir,function(err,files){
    if (err) throw err;
    var c=0;
    files.forEach(function(file){
        c++;
        fs.readFile(dir+file,'utf-8',function(err,html){
            if (err) throw err;
            data[file]=html;
            if (0===--c) {
                console.log(data);  //socket.emit('init', {data: data});
            }
        });
    });
});  
};



imageloader.getImageUrlList = function(){
    return readFromFile();
};
