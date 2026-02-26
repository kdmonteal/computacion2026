import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f9fa);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// 1. Selecciona el contenedor de la columna derecha en tu HTML
const container = document.getElementById('canvas-container');

// 2. Crea el renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });

// 3. Configura el tamaño basado en el contenedor, NO en la ventana completa
// Usamos clientWidth y clientHeight para obtener el ancho/alto de la columna de Bootstrap
renderer.setSize(container.clientWidth, container.clientHeight);

// 4. Agrega el lienzo (canvas) al contenedor en lugar de a document.body
container.appendChild(renderer.domElement);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// First Geometry Shape (CUBE)
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x1f626e, wireframe:true } );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = -1.5;
scene.add( cube );

// Second Geometry Shape (TORUS)
const geometryTorus = new THREE.TorusGeometry( 0.5, 0.2, 8, 15 );
const materialTorus = new THREE.MeshBasicMaterial( { color: 0x1f6e34, wireframe:true } );
const torus = new THREE.Mesh( geometryTorus, materialTorus );
scene.add( torus );

// Second Geometry Shape (CONE)
const geometryCone = new THREE.ConeGeometry( 0.5, 1.4, 15 );
const materialCone = new THREE.MeshBasicMaterial( { color: 0x4e1f6e, wireframe:true } );
const cone = new THREE.Mesh(geometryCone, materialCone );
cone.position.x = 1.5;
scene.add( cone );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;
camera.position.y = 3;

controls.update();

function animate( time ) {
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  torus.rotation.x = time / 2000;
  torus.rotation.y = time / 1000;

  cone.rotation.x = time / 2000;
  cone.rotation.y = time / 1000;

  controls.update();
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

///////////////////////////////////////////////
const size = 20;
const divisions = 20;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
///////////////////////////////////////////////


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

document.getElementById("btnCreate").addEventListener("click",createObject);

function createObject() {
  let x = document.getElementById("cube-x").value;
  let y = document.getElementById("cube-y").value;
  let z = document.getElementById("cube-z").value;
  let myColor = document.getElementById("objectColor").value;
  
  const geometryCube = new THREE.BoxGeometry( x,y,z );
  const materialCube = new THREE.MeshBasicMaterial( { color: myColor, wireframe:true } );
  const cube = new THREE.Mesh( geometryCube, materialCube );
  scene.add( cube );
}