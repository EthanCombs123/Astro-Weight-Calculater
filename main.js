function init() {
// --- Make background video autoplay everywhere (esp. Safari/iOS) ---
const video = document.getElementById('bg-video');
if (video) {
const tryPlay = () => video.play().catch(() => {});
// Set the properties Safari cares about
video.muted = true;
video.setAttribute('muted', '');
video.setAttribute('playsinline', '');
video.setAttribute('webkit-playsinline', '');
video.removeAttribute('controls');
// Play as soon as it's ready
if (video.readyState >= 2) {
tryPlay();
} else {
video.addEventListener('loadeddata', tryPlay, { once: true });
video.addEventListener('canplay', tryPlay, { once: true });
}
// Resume after tab visibility changes (Safari sometimes pauses)
document.addEventListener('visibilitychange', () => {
if (!document.hidden) tryPlay();
});
}

// --- Populate planets + calculator ---
const planets = [
['Mercury', 0.377], ['Venus', 0.9032], ['Earth', 1],
['Moon', 0.1655], ['Mars', 0.3895], ['Jupiter', 2.64],
['Saturn', 1.139], ['Uranus', 0.917], ['Neptune', 1.148],
['Pluto', 0.06], ['Sun', 27.9],
];

const userWeightInput = document.getElementById('user-weight');
const planetSelect = document.getElementById('planets');
const output = document.getElementById('output');
const button = document.getElementById('calculate-button');

planets.forEach(([name, gravity]) => {
const opt = document.createElement('option');
opt.value = gravity;
opt.textContent = name;
planetSelect.appendChild(opt);
});

button.addEventListener('click', () => {
const userWeight = parseFloat(userWeightInput.value);
if (Number.isNaN(userWeight)) {
output.textContent = 'Please enter a valid number.';
return;
}
const planetName = planetSelect.options[planetSelect.selectedIndex].text;
const gravity = parseFloat(planetSelect.value);
const result = userWeight * gravity;
output.textContent = `On ${planetName}, you would weigh ${result.toFixed(2)} lbs.`;
});

// --- Starfield animation ---
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
const COUNT = 150;

function resize() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < COUNT; i++) {
stars.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
r: Math.random() * 1.2,
a: Math.random(),
v: Math.random() * 0.02 + 0.005
});
}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
for (const s of stars) {
s.a += s.v;
ctx.globalAlpha = Math.abs(Math.sin(s.a));
ctx.beginPath();
ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
ctx.fillStyle = '#ffffff';
ctx.fill();
}
requestAnimationFrame(draw);
}
draw();
}

// Run whether DOMContentLoaded already fired or not
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init);
} else {
init();
}