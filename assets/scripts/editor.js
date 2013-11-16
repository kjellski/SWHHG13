
var Editor = function (canvas) {

    var canvas = canvas;

    function addNewScene(sceneFromBefore){
        canvas.add(ShapeProvider.Scene());
    }

	function init() {
		console.log('Editor initialized.');
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

            // Bind the event listeners for the image elements
            var images = document.querySelectorAll('#item_area img');
            [].forEach.call(images, function (img) {
                img.addEventListener('dragstart', handleDragStart, false);
                img.addEventListener('dragend', handleDragEnd, false);
                console.log(img);
            });
            // Bind the event listeners for the canvas
            var canvasContainer = document.getElementById('canvas-container');
            canvasContainer.addEventListener('dragenter', handleDragEnter, false);
            canvasContainer.addEventListener('dragover', handleDragOver, false);
            canvasContainer.addEventListener('dragleave', handleDragLeave, false);
            canvasContainer.addEventListener('drop', handleDrop, false);
        } else {
            // Replace with a fallback to a library solution.
            alert("This browser doesn't support the HTML5 Drag and Drop API.");
        }
    }

    init();
    return {
        addNewScene: addNewScene,
        updateDrapAndDropHandler: updateDrapAndDropHandler
    }
}(canvas);

