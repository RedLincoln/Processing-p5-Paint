var radius = 5
var lastPoint = null
var oldCol = 0
var col = 0
var wid = 10
var clearCB = false

function setup() {
  createCanvas(400, 400);
  background(255)
  rect(0, 0, width, height)
  checkbox = createCheckbox('Goma', false);
  checkbox.changed(onClearChange) 
  checkbox.position(0, height + 5)
  button = createButton('Limpiar Lienzo')
  button.mousePressed(() => {
    background(255)
    stroke(0)
    strokeWeight(1)
    rect(0, 0, width, height)
  })
  button.position(70, height + 5)
  colorPicker = createColorPicker('#000000');
  colorPicker.position(180, height + 3);
  colorPicker.changed(() => {
    if (clearCB){
      oldCol = colorPicker.color()  
    }else{
      col = colorPicker.color()
    }
  })
  label = createP('Tamaño de pincel: ' + wid)
  label.position(0, height + 15)
  slider = createSlider(4, 40, wid, 2)
  slider.changed(() => {
      wid = slider.value()
      label.elt.innerHTML = ('Tamaño del pincel: ' + wid)
  })
  slider.position(150, height + 30)
}

function onClearChange(){
  clearCB = !clearCB
    if (clearCB){
      oldCol = col
      col = 255
    }else{
      col = oldCol
    }
}

function mouseDragged() {
  stroke(col)
  strokeWeight(wid)
  if (lastPoint == null){
    point(mouseX, mouseY)
  }else{
    line(lastPoint[0], lastPoint[1], mouseX, mouseY)
  }
  lastPoint = [mouseX, mouseY]
}

function mouseReleased(){
  lastPoint = null
}