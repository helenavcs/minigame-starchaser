const constellations = [
    
    {
        name: "Orion",
        points: [
            { x: 400, y: 100 },
            { x: 350, y: 150 },
            { x: 450, y: 150 },
            { x: 400, y: 200 },
            { x: 300, y: 250 },
            { x: 500, y: 250 },
            { x: 250, y: 350 },
            { x: 550, y: 350 }
        ]
    },
    {
        name: "Cassiopeia",
        points: [
            { x: 150, y: 50 },
            { x: 200, y: 100 },
            { x: 250, y: 50 },
            { x: 300, y: 100 },
            { x: 350, y: 50 },
        ]
    },
    {
        name: "Leo",
        points: [
            { x: 100, y: 200 },
            { x: 150, y: 250 },
            { x: 200, y: 200 },
            { x: 250, y: 250 },
            { x: 300, y: 200 },
        ]
    },
    {
        name: "Taurus",
        points: [
            { x: 50, y: 350 },
            { x: 100, y: 300 },
            { x: 150, y: 350 },
            { x: 200, y: 300 },
            { x: 250, y: 350 },
        ]
    }
];

let currentConstellationIndex = 0;
let currentPointIndex = 0;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let points = constellations[currentConstellationIndex].points;

canvas.classList.add('canvas-fade');
canvas.addEventListener('mousedown', onMouseDown);

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
}

function drawPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach((point, index) => {
        drawStar(point.x, point.y, 5, 10, 5); 
    });
}

function onMouseDown(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const currentPoint = points[currentPointIndex];
    const distance = Math.sqrt(Math.pow(mouseX - currentPoint.x, 2) + Math.pow(mouseY - currentPoint.y, 2));
    
    if (distance < 15) {
        animatePoint(currentPointIndex);
        currentPointIndex++;
        if (currentPointIndex >= points.length) {
            setTimeout(() => {
                canvas.style.opacity = 0;
                setTimeout(() => {
                    currentConstellationIndex = (currentConstellationIndex + 1) % constellations.length;
                    currentPointIndex = 0;
                    points = constellations[currentConstellationIndex].points;
                    drawPoints();
                    canvas.style.opacity = 1;
                    alert(`you completed the constellation ${constellations[currentConstellationIndex].name}!`);
                }, 1000);
            }, 500);
        } else {
            drawLines();
        }
    }
}

function animatePoint(index) {
    const point = points[index];
    const rect = canvas.getBoundingClientRect();
    const pointElement = document.createElement('div');
    pointElement.style.position = 'fixed';
    pointElement.style.width = '24px';
    pointElement.style.height = '24px';
    pointElement.style.background = 'none';
    pointElement.style.top = `${rect.top + point.y - 10}px`;
    pointElement.style.left = `${rect.left + point.x - 10}px`;
    pointElement.classList.add('animated-point');


    const starSvg = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.12 8.36H20.84L15.36 12.38L17.48 18.74L12 14.72L6.52 18.74L8.64 12.38L3.16 8.36H9.88L12 2Z" fill="#ffffff" stroke="#ffffff" stroke-width="2"/>
        </svg>
    `;
    pointElement.innerHTML = starSvg;

    document.body.appendChild(pointElement);

    setTimeout(() => {
        document.body.removeChild(pointElement);
    }, 500);
}

function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPoints();
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i <= currentPointIndex; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff'; 
    ctx.stroke();
}

drawPoints();








document.addEventListener('DOMContentLoaded', function() {
    const text = document.querySelector('.wave-text');
    const textContent = text.textContent;
    text.innerHTML = '';

    for (let i = 0; i < textContent.length; i++) {
        const span = document.createElement('span');
        span.textContent = textContent[i];
        if (textContent[i] === ' ') {
            span.style.width = '0.5em'; 
        }
        span.style.animationDelay = `${i * 0.1}s`;
        text.appendChild(span);
    }
});


