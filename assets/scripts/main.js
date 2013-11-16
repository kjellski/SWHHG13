var canvas = new fabric.Canvas('canvas');
canvas.setHeight(600);
canvas.setWidth(800);

// create a rectangle object
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20
});

// "add" rectangle onto canvas
canvas.add(rect);

//console.log(component.publicVar);
