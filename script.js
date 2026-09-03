const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")

// CURSOR
const customCursor = document.querySelectorAll('.custom-cursor');

function renderCustomCursor(x, y, lineWidth, size) {
    // Iniciar la ruta de dibujo
    ctx.beginPath();

    // Parámetros de arc(x, y, radio, ánguloInicio, ánguloFin)
    ctx.arc(x, y, size, 0, 2 * Math.PI);

    // Rellenar el círculo
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Dibujar el borde del círculo
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'black';
    ctx.stroke();

}

document.addEventListener('mousemove', (e) => {
    let mouseX = e.x
    let mouseY = e.y

    customCursor.forEach((cursor) => {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
})


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


const BACKGROUND = "#101010"
const FOREGROUND = "#50FF50"
const LINE_WIDTH = 1

canvas.width = 800
canvas.height = 800

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function point({ x, y }) {
    const s = 2;
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - s / 2, y - s / 2, s, s)
}

const VERTEX_COUNT = vs.length

const origX = new Float64Array(VERTEX_COUNT)
const origY = new Float64Array(VERTEX_COUNT)
const origZ = new Float64Array(VERTEX_COUNT)
for (let i = 0; i < VERTEX_COUNT; i++) {
    origX[i] = vs[i].x
    origY[i] = vs[i].y
    origZ[i] = vs[i].z
}

const screenX = new Float64Array(VERTEX_COUNT)
const screenY = new Float64Array(VERTEX_COUNT)

const edgeSet = new Set()
const edgeA = []
const edgeB = []
for (const f of fs) {
    for (let i = 0; i < f.length; i++) {
        const a = f[i]
        const b = f[(i + 1) % f.length]
        if (a === b) continue
        const key = a < b ? a * VERTEX_COUNT + b : b * VERTEX_COUNT + a
        if (!edgeSet.has(key)) {
            edgeSet.add(key)
            edgeA.push(a)
            edgeB.push(b)
        }
    }
}
const edgeA32 = Int32Array.from(edgeA)
const edgeB32 = Int32Array.from(edgeB)
const EDGE_COUNT = edgeA32.length

let dz = 1.5
let angle = 0
let lastTime = null

function frame(time) {
    if (lastTime === null) lastTime = time
    const dt = (time - lastTime) / 1000
    lastTime = time
    // dz += 1*dt
    angle += Math.PI / 2 * dt

    clear()

    const c = Math.cos(angle)
    const s = Math.sin(angle)

    for (let i = 0; i < VERTEX_COUNT; i++) {
        const x = origX[i]
        const y = origY[i]
        const z = origZ[i]

        const rx = x * c - z * s
        const rz = x * s + z * c

        const tz = rz + dz

        const px = rx / tz
        const py = y / tz

        screenX[i] = (px + 1) / 2 * canvas.width
        screenY[i] = (1 - (py + 1) / 2) * canvas.height
    }

    ctx.lineWidth = LINE_WIDTH
    ctx.strokeStyle = FOREGROUND
    ctx.beginPath()
    for (let i = 0; i < EDGE_COUNT; i++) {
        const a = edgeA32[i]
        const b = edgeB32[i]
        ctx.moveTo(screenX[a], screenY[a])
        ctx.lineTo(screenX[b], screenY[b])
    }
    ctx.stroke()

    for (let i = 0; i < VERTEX_COUNT; i++) point({ x: screenX[i], y: screenY[i] })

    // renderCustomCursor(mouseX, mouseY, 1, 10)
    requestAnimationFrame(frame)
}
requestAnimationFrame(frame)