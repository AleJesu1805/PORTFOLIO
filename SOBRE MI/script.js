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