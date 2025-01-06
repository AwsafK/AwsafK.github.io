const canvas = document.getElementById("paper-planes");
const ctx = canvas.getContext("2d");
const toggleButton = document.getElementById("dark-mode-toggle");
const main = document.querySelector("main");
const header = document.querySelector("header");

let darkMode = false;

// Resize canvas to fill screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Draw paper planes following mouse
let planes = [];
for (let i = 0; i < 50; i++) {
  planes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: Math.random() * 2 - 1,
    dy: Math.random() * 2 - 1,
  });
}

function drawPlanes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  planes.forEach((plane) => {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(plane.x, plane.y);
    ctx.lineTo(plane.x + 10, plane.y + 5);
    ctx.lineTo(plane.x, plane.y + 10);
    ctx.closePath();
    ctx.fill();

    plane.x += plane.dx;
    plane.y += plane.dy;

    if (plane.x < 0 || plane.x > canvas.width) plane.dx *= -1;
    if (plane.y < 0 || plane.y > canvas.height) plane.dy *= -1;
  });

  requestAnimationFrame(drawPlanes);
}
drawPlanes();

// Follow mouse direction
canvas.addEventListener("mousemove", (e) => {
  planes.forEach((plane) => {
    let angle = Math.atan2(e.clientY - plane.y, e.clientX - plane.x);
    plane.dx = Math.cos(angle) * 2;
    plane.dy = Math.sin(angle) * 2;
  });
});

// Dark Mode Toggle
toggleButton.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  main.classList.toggle("dark-mode", darkMode);
  header.classList.toggle("dark-mode", darkMode);
});
