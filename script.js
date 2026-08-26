// CURSOR
const customCursor = document.querySelectorAll('.custom-cursor');

document.body.style.cursor = 'none';

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    customCursor.forEach((cursor) => {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
});

// MODAL
const imageAlex = document.querySelector('.container__image__alex');
const previewImage = document.getElementById('preview-image');
const closeButton = document.getElementById('close-dialog');

imageAlex.addEventListener('pointerdown', () => {
    previewImage.showModal();
    previewImage.style.height = '70%';
});

closeButton.addEventListener('pointerdown', () => {
    previewImage.style.height = '0%';
    previewImage.close();
});

// CANVAS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth / 3;
canvas.height = window.innerHeight / 3;
let hue = 0;

function ramdomNumber(min, max) {
    return min + Math.random() * (max - min);
}

class Burbles {
    constructor(speedX, speedY, x, y, size, colorFill, colorStroke) {
        this.speedX = speedX;
        this.speedY = speedY;
        this.x = x;
        this.y = y;
        this.size = size;
        this.colorFill = colorFill;
        this.colorStroke = colorStroke;
    }
    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.colorFill;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.colorStroke;
        ctx.stroke();
    }
}

let burbles = [];

for (let i = 0; i < 20; i++) {
    const size = ramdomNumber(5, 20);
    const speedX = ramdomNumber(-5, 5);
    const speedY = ramdomNumber(-5, 5);

    const burble = new Burbles(speedX, speedY, ramdomNumber(0, canvas.width), ramdomNumber(0, canvas.height), size, `hsla(${i * 2 + 130}, 83%, 25%, 0.72)`, 'transparent');
    burbles.push(burble);
}

const fps = 20;
const frameDuration = 1000 / fps;
let ultimoTiempo = 0;

const intervaloRecalculoRuta = 120;
let frameCount = 0;

function animate(tiempoActual) {
    requestAnimationFrame(animate);
    const delta = tiempoActual - ultimoTiempo;
    if (delta < frameDuration) return;
    ultimoTiempo = tiempoActual - (delta % frameDuration);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    burbles.forEach(burble => {
        burble.move();
        burble.draw();
    });

    const debeRecalcularRuta = frameCount % intervaloRecalculoRuta === 0;
    frameCount++;

    if (debeRecalcularRuta) {
        burbles.forEach(burble => {
            burble.speedX = Math.cos(ramdomNumber(0, 2 * Math.PI));
            burble.speedY = Math.sin(ramdomNumber(0, 2 * Math.PI));
        });
    }
}
requestAnimationFrame(animate);