import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f9fa);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// 1. Seleccionamos el canvas que ya existe en el HTML
const canvasElement = document.getElementById('myCanvas');
const container = document.getElementById('canvas-container');

// 2. Le pasamos el canvas como parámetro al crear el WebGLRenderer
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvasElement, 
    antialias: true 
});

// 3. Configuramos el tamaño para que llene su contenedor (el panel derecho), NO toda la ventana
renderer.setSize(container.clientWidth, container.clientHeight);

// const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias suaviza los bordes
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(5, 4, 6); // Moví un poco la cámara para ver la casa desde un ángulo superior
controls.update();

// ILUMINACIÓN (Esencial para ver volumen)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Luz general suave
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10); // Viene desde arriba y la derecha
scene.add(directionalLight);

// CONSTRUCCIÓN DE LA CASA
const houseGroup = new THREE.Group(); // Agrupamos todo para mover la casa entera fácilmente

// --- PAREDES (Cubo) ---
// BoxGeometry(ancho, alto, profundidad)
const wallsGeometry = new THREE.BoxGeometry(3, 2.5, 3);
const wallsMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd }); // Gris claro
const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
// El centro del cubo está en el medio. Si mide 2.5 de alto, lo subimos la mitad (1.25) para que repose en la grilla.
walls.position.y = 1.25; 
houseGroup.add(walls);

// --- TECHO (Cono con 4 lados = Pirámide) ---
// ConeGeometry(radio, altura, segmentos_radiales)
const roofGeometry = new THREE.ConeGeometry(2.5, 1.5, 4);
const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x8b0000 }); // Rojo oscuro
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
// Altura paredes (2.5) + mitad de la altura del techo (0.75) = 3.25
roof.position.y = 3.25; 
roof.rotation.y = Math.PI / 4; // Lo rotamos 45° para alinear las esquinas con las paredes
houseGroup.add(roof);

// --- PUERTA (Cubo delgado) ---
const doorGeometry = new THREE.BoxGeometry(0.8, 1.6, 0.1);
const doorMaterial = new THREE.MeshLambertMaterial({ color: 0x5c4033 }); // Café madera
const door = new THREE.Mesh(doorGeometry, doorMaterial);
// Centrado en X(0), apoyado en la grilla Y(0.8, que es la mitad de 1.6), al frente Z(1.5, borde de la pared)
door.position.set(0, 0.8, 1.5); 
houseGroup.add(door);

// Añadimos la casa completa a la escena
scene.add(houseGroup);

// AYUDAS VISUALES Y ANIMACIÓN
const size = 20;
const divisions = 20;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

function animate( time ) {
  controls.update();
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}