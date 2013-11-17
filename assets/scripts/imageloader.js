var ImageLoader = function() {
    function loadCategories() {
        var result;
        $.ajax({
            url:'/editor/categories',
            type: 'GET',
            async: false,
            crossDomain: true
        }).done(function(data){
            //console.log('data: ', data);
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
            //console.log('data: ', data);
            result = data;
            });
        
        return result;
    }

    function generateImageHTMLViewFor(category){
      $(".navbar-default .navbar-nav > li > a").parent().removeClass('active');
      $(".navbar-default .navbar-nav > li > a:contains('" + category + "')").parent().addClass('active')
      
      var urls = this.loadImagesByCategory(category);
      var item_area = document.getElementById("item_area");
      var html = "";
      for(var i in urls) {
        html += "<img src='"+urls[i]+"' draggable='true' width='180' height='180'><br />";
      }

      item_area.innerHTML = html;
      Editor.updateDrapAndDropHandler();
      //console.log("update event handler");
    }

    function init() { console.log('ImageLoader initialized.'); }
    init();
    return {                   
      loadCategories: loadCategories,
      loadImagesByCategory: loadImagesByCategory,
      generateImageHTMLViewFor: generateImageHTMLViewFor
    }
}();
