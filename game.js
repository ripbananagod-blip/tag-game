const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const players = [
  { x: 100, y: 100, color: "red", speed: 3, controls: {up:"w",down:"s",left:"a",right:"d"} },
  { x: 700, y: 100, color: "blue", speed: 3, controls: {up:"i",down:"k",left:"j",right:"l"} },
  { x: 100, y: 400, color: "green", speed: 3, controls: {up:"t",down:"g",left:"f",right:"h"} },
  { x: 700, y: 400, color: "yellow", speed: 3, controls: {up:"arrowup",down:"arrowdown",left:"arrowleft",right:"arrowright"} }
];

let keys = {};
let itPlayer = 0; // index of who's "it"

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function update() {
  players.forEach((p, i) => {
    if (keys[p.controls.up]) p.y -= p.speed;
    if (keys[p.controls.down]) p.y += p.speed;
    if (keys[p.controls.left]) p.x -= p.speed;
    if (keys[p.controls.right]) p.x += p.speed;

    // Keep inside canvas
    p.x = Math.max(0, Math.min(canvas.width - 20, p.x));
    p.y = Math.max(0, Math.min(canvas.height - 20, p.y));

    // Check collision with "it"
    if (i !== itPlayer) {
      const it = players[itPlayer];
      const dist = Math.hypot(p.x - it.x, p.y - it.y);
      if (dist < 20) {
        itPlayer = i;
      }
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  players.forEach((p, i) => {
    ctx.fillStyle = (i === itPlayer) ? "white" : p.color;
    ctx.fillRect(p.x, p.y, 20, 20);
  });

  ctx.fillStyle = "white";
  ctx.fillText("Player " + (itPlayer + 1) + " is IT!", 10, 20);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();