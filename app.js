const canvas = document.getElementById("draw");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let drawEnabled = false;
let color = 200;
let direction = true;
let lastX, lastY;

const draw = e => {
    if (!drawEnabled) return;

    //    color
    ctx.strokeStyle = `hsl(${color},100%,50%)`;

    // starts drawing
    ctx.beginPath();

    //  lines shapes
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // line start
    ctx.moveTo(lastX, lastY);

    // line end
    ctx.lineTo(e.offsetX, e.offsetY);

    // actual drawing 
    ctx.stroke();

    // moveTo update
    [lastX, lastY] = [e.offsetX, e.offsetY];

    // color update 
    color++;
    if (color >= 360) color = 0;

    // line thickness update
    if (ctx.lineWidth >= 70 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    direction ? ctx.lineWidth++ : ctx.lineWidth--;

    // colors composition css mix-blend-mode
    ctx.globalCompositeOperation = "exclusion";
    // more fun effects at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
}



// listeners with flag enabling a draw func
document.addEventListener("mousedown", (e) => {
    drawEnabled = true;

    // line start updates to where mousedown begins
    // array destructuring lastX = e.offsetX, lastY = e.offsetY;
    [lastX, lastY] = [e.offsetX, e.offsetY];

});
document.addEventListener("mouseup", () => drawEnabled = false);
document.addEventListener("mouseout", () => drawEnabled = false);
document.addEventListener("mousemove", draw);