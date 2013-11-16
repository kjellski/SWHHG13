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
        html += "<img src='"+urls[i]+"' draggable='true' width='100' height='100'><br />";
      }

      item_area.innerHTML = html;
      Editor.updateDrapAndDropHandler();
    }

    function init() { console.log('ImageLoader initialized.'); }
    init();
    return {                   
      loadCategories: loadCategories,
      loadImagesByCategory: loadImagesByCategory,
      generateImageHTMLViewFor: generateImageHTMLViewFor
    }
}();
