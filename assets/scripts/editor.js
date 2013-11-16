//var fs = require('fs');

var editor = function () {
  var item = {
    'name': '',
    'image': '',
    'type': '',
    'action': function() {}
  };
    //Contains all Saved Elemens/Items/Images
    var item_db = {};

    //Contains ready to pick scenes like scene -> map of items
    var canvasStack = {};


    function init() {
        //console.log('Im the Editor Component');
        load_assets('user_image_tempaltes');

        set_item_area_bg();
    }

    function load_assets(path){
      //Fill the item_db MAP
      //allImages = fs.readdirSync(path);
      //for(image in allImages){

        //var item = new Item();
        //item['name'] = image;
        //item['image'] = path + image;
        //item['type'] = "Any";

        //item_db[image] = item;
      //}
    }
    
    //Function for switching content in item area between
    //Background, items and action
    function set_item_area_bg()
    {
      var item_area = document.getElementById("item_area");
      item_area.innerHTML = "foo bar";
    }

    init();
    return {
        publicVar: item_db,
        publicVar: canvasStack
    }
}();

