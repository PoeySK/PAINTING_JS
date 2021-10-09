// const var
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

// let var
let painting = false;
let filling = false;

// canvas tool size
canvas.width = 700;
canvas.height = 700;

// the basic setting of the canvas
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


// painting state
function stopPainting(event) {
    painting = false;
}
function startPainting() {
    painting = true;
}

// pressing the mouse
function onMounseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        // find the path
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // draw a line
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// pressed the mouse
function onMounseDown(event) {
    painting = true;

}

// get a color
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// change a line size
function handleRangeChange(event){
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

// in the fill mode
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerHTML = "Fill";
    } else {
        filling = true;
        mode.innerHTML = "Paint";
        
    }
}

// click the canvas
function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// delete the right-click message
function handleCM(event){
    event.preventDefault();
}

// click the save button
function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();

}

if (canvas) {
    canvas.addEventListener("mousemove", onMounseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// give funtion to all color
if(colors){
    Array.from(colors).forEach(color =>
        color.addEventListener("click", handleColorClick)
    );
}
        
if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}