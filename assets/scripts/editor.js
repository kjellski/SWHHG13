var Editor = function () {

    var canvas;
    var canvasEventHandlerAdded = false;

    function createNewCanvas(height, width) {
      height = typeof height !== 'undefined' ? height : 600;
      width = typeof width !== 'undefined' ? width : 800;
      //console.log('creating canvas', canvas);

      if (!canvas){
        canvas = new fabric.Canvas('canvas');
        canvas.setHeight(height);
        canvas.setWidth(width);
        //console.log('created.');
      }
      else 
      {
        canvas.loadFromJSON({}, canvas.renderAll.bind(canvas), function(o, object) {
            console.log('rebound.');
        });
      }
    }

    function loadCanvasByName(name) {
      var graph = Store.load(canvas, name);
      //console.log("got dat graph: ", graph);
      if(graph) {
        canvas.loadFromJSON(graph, canvas.renderAll.bind(canvas), function(o, object) {});
      }
    }

    function renderSceneNames() {
        var names = Store.getNames();
        var html = document.getElementById('savedScenes');

        var output = "";
        for(var i in names) {
          output += "<a href='javascript:Editor.loadCanvasByName(\""+names[i]+"\")'>"+names[i]+"</a>";
        }

        html.innerHTML = output;

        loadCanvasByName('Default Scene');
    }

    function saveCanvas(){
      var title = document.getElementById("canvasTitle").value;
      Store.save(canvas, title);
    }

    function addNewScene(sceneFromBefore){
        canvas.add(ShapeProvider.Scene());
    }

	function init() {
          console.log('Editor initialized.');
          createNewCanvas();
          loadCanvasByName();
	}
      
    function updateDrapAndDropHandler(){

 
        function handleDragStart(e) {
            [].forEach.call(images, function (img) {
                img.classList.remove('img_dragging');
            });
            this.classList.add('img_dragging');
            console.log('dragging this: ', e);
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'copy'; // See the section on the DataTransfer object.
            // NOTE: comment above refers to the article (see top) -natchiketa

            return false;
        }

        function handleDragEnter(e) {
            // this / e.target is the current hover target.
            this.classList.add('over');
        }

        function handleDragLeave(e) {
            this.classList.remove('over'); // this / e.target is previous target element.
        }

        function handleDrop(e) {
            // this / e.target is current target element.

            if(e.preventDefault) { e.preventDefault(); }
            if (e.stopPropagation) {
                e.stopPropagation(); // stops the browser from redirecting.
            }

            var img = document.querySelector('#item_area img.img_dragging');

            console.log('event: ', e);

            var newImage = new fabric.Image(img, {
                width: img.width,
                height: img.height,
                // Set the center of the new object based on the event coordinates relative
                // to the canvas container.
                left: e.layerX,
                top: e.layerY
            });
            canvas.add(newImage);

            return false;
        }

        function handleDragEnd(e) {
            // this/e.target is the source node.
            [].forEach.call(images, function (img) {
                img.classList.remove('img_dragging');
            });
        }

        if (Modernizr.draganddrop) {
            // Browser supports HTML5 DnD.
            

            //cleanup old event handlers
            //cleanEventHandler();

            // Bind the event listeners for the image elements

            var images = document.querySelectorAll('#item_area img');
              [].forEach.call(images, function (img) {
                  img.addEventListener('dragstart', handleDragStart, false);
                  img.addEventListener('dragend', handleDragEnd, false);
//                  console.log(img);
              });
            // Bind the event listeners for the canvas
              if(!canvasEventHandlerAdded){
                var canvasContainer = document.getElementById('canvas-container');
                canvasContainer.addEventListener('dragenter', handleDragEnter, false);
                canvasContainer.addEventListener('dragover', handleDragOver, false);
                canvasContainer.addEventListener('dragleave', handleDragLeave, false);
                canvasContainer.addEventListener('drop', handleDrop, false);
                canvasEventHandlerAdded = true;
              }
        } else {
            // Replace with a fallback to a library solution.
            alert("This browser doesn't support the HTML5 Drag and Drop API.");
        }
    }

    init();
    return {
        addNewScene: addNewScene,
        createNewCanvas: createNewCanvas,
        loadCanvasByName: loadCanvasByName,
        saveCanvas: saveCanvas,
        renderSceneNames: renderSceneNames,
        updateDrapAndDropHandler: updateDrapAndDropHandler,
        canvas: canvas
    }
}();