var ImageLoader = function() {
    function loadCategories() {
        var result;
        $.ajax({
            url:'/editor/categories',
            type: 'GET',
            async: false,
            crossDomain: true
        }).done(function(data){
            console.log('data: ', data);
            result = data;
            });
        
        return result;
    }

    function loadImagesByCategory(cat){
        var result;
        $.ajax({
            url:'/editor/images/'+cat,
            type: 'GET',
            async: false,
            crossDomain: true
        }).done(function(data){
            console.log('data: ', data);
            result = data;
            });
        
        return result;
    }

    function generateImageHTMLViewFor(category){
      var urls = this.loadImagesByCategory(category);
      var item_area = document.getElementById("item_area");
      var html = "";
      for(var i in urls) {
        html += "<img src='"+urls[i]+"' class='draggable_image' draggable='true'><br />";
      }

      item_area.innerHTML = html;
    }

    function init() { console.log('ImageLoader initialized.'); }
    init();
    return {                   
      loadCategories: loadCategories,
      loadImagesByCategory: loadImagesByCategory,
      generateImageHTMLViewFor: generateImageHTMLViewFor
    }
}();
