const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const customCursor = document.getElementById('custom-cursor');

document.body.style.cursor = 'none';

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    customCursor.style.left = mouseX + 'px';
    customCursor.style.top = mouseY + 'px';
});