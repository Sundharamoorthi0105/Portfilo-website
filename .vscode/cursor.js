// Global variables
let currentEffect = 'line'; // 'line' or 'circle'
let canvas, ctx;
let pos = { x: 0, y: 0 };
let tempCircleTimeout = null;

// Line trail effect variables
let lines = [];
let lineParams = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98
};

// Circle cursor effect variables
let circles = [];
let circleParams = {
  circleCount: 12,
  maxRadius: 15,
  minRadius: 1,
  fadeSpeed: 0.1,
  followSpeed: 0.4
};

window.onload = function() {
  // Initialize canvas
  canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  
  // Set canvas styles
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  
  pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  // Initialize effects
  initLineEffect();
  initCircleEffect();
  
  // Set initial effect
  setEffect('line');
  
  // Event listeners
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", mouseMove);
  document.addEventListener("click", showTempCircle);
  
  // Start animation
  resizeCanvas();
  render();
};

function showTempCircle() {
  if (tempCircleTimeout) clearTimeout(tempCircleTimeout);
  
  const previousEffect = currentEffect;
  
  // Show circle cursor
  setEffect('circle');
  
  // After 2 seconds, revert
  tempCircleTimeout = setTimeout(() => {
    if (currentEffect === 'circle') {
      setEffect(previousEffect);
    }
    tempCircleTimeout = null;
  }, 1000);
}

function setEffect(effectType) {
  currentEffect = effectType;
  canvas.style.cursor = currentEffect === 'circle' ? "none" : "default";
}

// LINE TRAIL EFFECT FUNCTIONS
function initLineEffect() {
  lines = [];
  for (let i = 0; i < lineParams.trails; i++) {
    lines.push(new Line(0.4 + (i / lineParams.trails) * 0.025));
  }
}

function Line(spring) {
  this.spring = spring;
  this.friction = lineParams.friction;
  this.nodes = [];
  for (let i = 0; i < lineParams.size; i++) {
    let node = new Node();
    node.x = pos.x;
    node.y = pos.y;
    this.nodes.push(node);
  }
}

Line.prototype.update = function() {
  let spring = this.spring;
  let t = this.nodes[0];
  t.vx += (pos.x - t.x) * spring;
  t.vy += (pos.y - t.y) * spring;

  for (let i = 0; i < this.nodes.length; i++) {
    if (i > 0) {
      let prev = this.nodes[i - 1];
      t = this.nodes[i];
      t.vx += (prev.x - t.x) * spring;
      t.vy += (prev.y - t.y) * spring;
      t.vx += prev.vx * lineParams.dampening;
      t.vy += prev.vy * lineParams.dampening;
    }
    t.vx *= this.friction;
    t.vy *= this.friction;
    t.x += t.vx;
    t.y += t.vy;
    spring *= lineParams.tension;
  }
};

Line.prototype.draw = function() {
  ctx.beginPath();
  ctx.moveTo(this.nodes[0].x, this.nodes[0].y);
  for (let i = 1; i < this.nodes.length - 2; i++) {
    let c = (this.nodes[i].x + this.nodes[i + 1].x) / 2;
    let d = (this.nodes[i].y + this.nodes[i + 1].y) / 2;
    ctx.quadraticCurveTo(this.nodes[i].x, this.nodes[i].y, c, d);
  }
  ctx.strokeStyle = "rgba(158, 213, 31, 0.2)"; // green tone
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.closePath();
};

// CIRCLE CURSOR EFFECT FUNCTIONS
function initCircleEffect() {
  circles = [];
  for (let i = 0; i < circleParams.circleCount; i++) {
    circles.push(new Circle());
  }
}

function Circle() {
  this.x = pos.x;
  this.y = pos.y;
  this.radius = circleParams.maxRadius;
  this.targetRadius = circleParams.maxRadius;
  this.alpha = 1;
}

function updateCircles() {
  if (circles.length < circleParams.circleCount) {
    circles.push(new Circle());
  } else {
    circles.shift();
    circles.push(new Circle());
  }
  
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    let target = i === circles.length - 1 ? pos : circles[i + 1];
    
    circle.x += (target.x - circle.x) * circleParams.followSpeed;
    circle.y += (target.y - circle.y) * circleParams.followSpeed;
    
    circle.targetRadius = circleParams.maxRadius - 
      (circleParams.maxRadius - circleParams.minRadius) * (i / circles.length);
    circle.radius += (circle.targetRadius - circle.radius) * 0.3;
    
    circle.alpha = 1 - (i / circles.length);
  }
}

function drawCircles() {
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(158, 213, 31, ${circle.alpha * 0.3})`; // green trail
    ctx.fill();
  }
  
  // Main cursor dot
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
  ctx.fillStyle = "#9ed51f"; // solid green
  ctx.fill();
}

// COMMON FUNCTIONS
function Node() {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function mouseMove(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (currentEffect === 'line') {
    lines.forEach(line => {
      line.update();
      line.draw();
    });
  } else {
    updateCircles();
    drawCircles();
  }
  
  requestAnimationFrame(render);
}
// Select the button
const button = document.querySelector("#myButton");

// When button is clicked → temporarily show circle effect
button.addEventListener("click", () => {
    showTempCircle(); // Use your existing function to switch to circle
});
// Create the circle cursor element
const circle = document.createElement('div');
circle.style.width = '20px';
circle.style.height = '20px';
circle.style.border = '2px solid red';
circle.style.borderRadius = '50%';
circle.style.position = 'fixed';
circle.style.pointerEvents = 'none';
circle.style.zIndex = '9999';
circle.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(circle);

// Hide the default cursor
document.body.style.cursor = 'none';

// Move the circle to follow the mouse
document.addEventListener('mousemove', (e) => {
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
});


