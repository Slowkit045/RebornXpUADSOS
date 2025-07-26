const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let p1 = { x: 100, y: 300, color: "#00f", key: "w", snowballs: [] };
let p2 = { x: 500, y: 300, color: "#f00", key: "ArrowUp", snowballs: [] };

document.addEventListener("keydown", (e) => {
    if (e.key === p1.key) p1.snowballs.push({ x: p1.x + 20, y: p1.y, vx: 3 });
    if (e.key === p2.key) p2.snowballs.push({ x: p2.x - 20, y: p2.y, vx: -3 });
});

function drawPlayer(p) {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - 10, p.y - 20, 20, 20);
}

function drawSnowball(s) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
    ctx.fill();
}

function updateSnowballs(player) {
    for (let s of player.snowballs) s.x += s.vx;
    player.snowballs = player.snowballs.filter(s => s.x > 0 && s.x < canvas.width);
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(p1);
    drawPlayer(p2);
    updateSnowballs(p1);
    updateSnowballs(p2);
    p1.snowballs.forEach(drawSnowball);
    p2.snowballs.forEach(drawSnowball);
    requestAnimationFrame(loop);
}

loop();
