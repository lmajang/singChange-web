const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 200;

ctx.globalCompositeOperation = "destination-out";

let isDrawing = true;
let lastX = 0;
let lastY = 0;
let endX = 0;
let endY = 0;
const linesCoordinates = [
  [400, 250, 550, 500],
  [500, 150, 700, 575],
  [600, 125, 790, 525],
  [750, 100, 1000, 550],
  [950, 125, 1200, 575],
  [1150, 150, 1350, 545],
  [1350, 250, 1500, 475],
];

// const linesCoordinates = [
//   [200, 250, 300, 400],
//   [300, 200, 500, 500],
//   [400, 190, 590, 500],
//   [550, 150, 800, 500],
//   [700, 125, 1000, 475],
//   [900, 100, 1150, 450],
//   [1050, 175, 1300, 350],
// ];

let currentLineIndex = 0;

function draw() {
  console.log("draw begin")
  if (currentLineIndex >= linesCoordinates.length) {
    return;
  }

  const [lastX, lastY, endX, endY] = linesCoordinates[currentLineIndex];
  const slope = (endY - lastY) / (endX - lastX);
  const baseSpeed = 5;
  let speedX = baseSpeed;
  let speedY = slope * baseSpeed;
  if (!isDrawing) return;

  let currentX = lastX;
  let currentY = lastY;

  function drawCurrentLine() {
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);
    currentX += speedX;
    currentY += speedY;
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    if ((speedX > 0 && currentX < endX) || (speedX < 0 && currentX > endX)) {
      speedX = speedX + 0.1;
      speedY = speedY +slope*0.1;
      requestAnimationFrame(drawCurrentLine);
    }
    else{
      currentLineIndex++;
      draw();
    }
  }
  // ctx.beginPath();
  // ctx.moveTo(lastX, lastY);
  // ctx.lineTo(nowX, nowY);
  // ctx.stroke();
  drawCurrentLine();
}

const targetNode = document.querySelector('.l__preloader');

// 当节点被移除时执行的回调函数
const onRemoval = () => {
  setTimeout(() => {
    draw();
  }, 500)
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.removedNodes.length) {
      for (let node of mutation.removedNodes) {
        if (node === targetNode) {
          onRemoval();
          observer.disconnect(); // 停止观察
          break;
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
// canvas.addEventListener("mousedown", (e) => {
//   isDrawing = true;
//   [lastX, lastY] = [e.offsetX, e.offsetY];
// });

// canvas.addEventListener("mousemove", draw);
// canvas.addEventListener("mouseup", () => (isDrawing = false));
// canvas.addEventListener("mouseout", () => (isDrawing = false));