var ShapeProvider = function(canvas){
    var canvas = canvas;

    function generateScene(){
        var ch = canvas.getHeight();
        var cw = canvas.getWidth();


        var sceneSymbol = fabric.Image.fromURL('/images/scene.png', function(img) {
            img.setTop(20);
            img.setLeft(25);
            img.setWidth(50);
            img.setHeight(40);
            
            canvas.add(img);
        });

        var plusSymbol = fabric.Image.fromURL('/images/plus.png', function(img) {

            img.setWidth(20);
            img.setHeight(20);
            img.setTop(10);
            img.setLeft(10);
            
            canvas.add(img);
        });

        var group = new fabric.Group([ sceneSymbol, plus ], {
            left: cw/2,
            top: ch/2,
        });
    }

    function init(){
        console.log("ShapeProvider initialized.");
    }
    init();
    return {
        Scene: generateScene
    }
}(canvas);