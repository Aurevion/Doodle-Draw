import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';

// Basic Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

// Line Material and Variables
let lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
let points = [];
let currentLine = null;

// Mouse Tracking
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

// Plane for Drawing
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: ffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.visible = false; // Hide the plane itself
scene.add(plane);

// Event Listeners for Drawing
let isDrawing = false;

document.addEventListener('mousedown', (event) => {
    isDrawing = true;
    points = [];
});

document.addEventListener('mouseup', () => {
    isDrawing = false;
    if (points.length > 1) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial.clone());
        scene.add(line);
    }
    points = [];
});

document.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    // Map mouse to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Project the mouse position onto the 3D plane
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(plane);

    if (intersects.length > 0) {
        const point = intersects[0].point;
        points.push(point);

        if (points.length > 1) {
            if (currentLine) {
                scene.remove(currentLine);
            }

            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            currentLine = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(currentLine);
        }
    }
});

// Clear Button
document.getElementById('clear').addEventListener('click', () => {
    // Remove all lines from the scene
    while (scene.children.length > 1) {
        scene.remove(scene.children[1]);
    }
});

// Update Line Color
document.getElementById('color').addEventListener('input', (event) => {
    lineMaterial.color.set(event.target.value);
});

// Update Line Width (Three.js doesn't support this directly; approximate effect)
document.getElementById('lineWidth').addEventListener('input', (event) => {
    const width = event.target.value;
    lineMaterial.linewidth = width;
});

// Animation Loop
const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();
