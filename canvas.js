const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth * 0.92, 1200);
    canvas.height = Math.min(window.innerHeight * 0.65, 800);
}
resizeCanvas();

window.addEventListener('resize', resizeCanvas);


// window.onresize=resizeCanvas;


function drawRandomShape(x, y) {
    const shapeType = Math.floor(Math.random() * 3); // 0-circle, 1-rectangle,2-triangle
    const size = Math.random() * 50 + 20;
    const hue = Math.random() * 360;
    const color = `hsl(${hue},95%,65%)`;

    c.shadowcolor = `hsl(${hue},95%,50%)`;
    c.shadowBlur = 15;

    c.fillStyle = color;
    c.beginPath();
    if (shapeType === 0) {
        c.arc(x, y, size, 0, Math.PI * 2);
    } else if (shapeType === 1) {
        c.rect(x - size / 2, y - size / 2, size, size);
    } else {
        c.moveTo(x, y - size);
        c.lineTo(x + size, y + size);
        c.lineTo(x - size, y + size);
        c.closePath();
    }

    c.fill();
    c.shadowBlur = 0;
}

let hasDrawn = false;
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 30;

    if (!hasDrawn) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        hasDrawn = true;
    }
    drawRandomShape(mouseX+offsetX, mouseY+offsetY);
});

document.getElementById('clearBtn').addEventListener('click', () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
});

c.font = 'bold 28px Arial';
c.fillStyle = 'rgba(200,220,255,0.7)';
c.textAlign = 'center';
c.fillText('Click Anywhere to create Shapes!', canvas.width / 2, canvas.height / 2);

