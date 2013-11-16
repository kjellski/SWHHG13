var Editor = function (canvas) {

    var canvas = canvas;

    function addNewScene(sceneFromBefore){
        canvas.add(ShapeProvider.Scene());
    }

	function init() {
		console.log('Editor initialized.');
	}

    init();
    return {
        addNewScene: addNewScene
    }
}(canvas);

