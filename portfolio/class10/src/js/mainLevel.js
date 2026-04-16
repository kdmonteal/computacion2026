import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'lil-gui';

const timer = new THREE.Timer();
timer.connect( document );

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); //0x5C0D00

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


// Light

const fillLight1 = new THREE.HemisphereLight( 0x8dc1de, 0x00668d, 1.5 );
fillLight1.position.set( 2, 1, 1 );
scene.add( fillLight1 );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( ambientLight );  

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set( 5, 10, 7.5 );
scene.add( directionalLight );

camera.position.z = 5;

const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );

function animate( time ) {
    timer.update();
    stats.update();
  renderer.render( scene, camera );
}

/// LOAD SCENE ////////////////////////////////
const loader = new GLTFLoader();
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '../src/models/glb/' );
loader.setDRACOLoader( dracoLoader );
const gltf = await loader.loadAsync( '../src/models/glb/scene.glb' );
gltf.scene.position.set(0, -2.5, 3.5);
gltf.scene.rotation.y = Math.PI*1.5; // Rota 180 grados en el eje Y
scene.add( gltf.scene );
///////////////////////////////////////////////


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

// ***************************************************************
// AUDIO play
window.addEventListener('load', function() {
    var audio = document.getElementById('miAudio2');
    var reproducir = function() {
        audio.play().then(function() {
            document.removeEventListener('click', reproducir);
            document.removeEventListener('keydown', reproducir);
        }).catch(function(error) {
            console.log("Esperando interacción real...");
        });
    };

    // Escuchar clics o teclas (las interacciones que sí valen)
    document.addEventListener('click', reproducir);
    document.addEventListener('keydown', reproducir);
});

// ****************** GUI ***************************
const gui = new GUI();

// Parámteros iniciales para controlar la luz
const params = {
  lightType: 'Point',
  enabled: true,
  intensity: 1,
  color: '#ffffff',
  positionX: 0,
  toggleLight: function() {
      this.enabled = !this.enabled;
  }
};

// Crear la carpeta de luz
const lightFolder = gui.addFolder('Light');
lightFolder.open();

// Añadir controles a la carpeta de luz
lightFolder.add(params, 'lightType', ['Point', 'Directional', 'Ambient']).name('Light Type');
lightFolder.add(params, 'enabled').name('Light Enabled');
lightFolder.add(params, 'intensity', 0, 2).name('Light Intensity');
lightFolder.addColor(params, 'color').name('Light Color');
lightFolder.add(params, 'positionX', -10, 10).name('Position X');
lightFolder.add(params, 'toggleLight').name('Toggle Light');

const cameraFolder = gui.addFolder('Camera Translation');
      cameraFolder.add(camera.position, 'x', -10, 10).name('Position X');
      cameraFolder.add(camera.position, 'y', -10, 10).name('Position Y');
      cameraFolder.add(camera.position, 'z', -10, 10).name('Position Z');
      cameraFolder.open();

const cameraFolder2 = gui.addFolder('Camera Rotation');
      cameraFolder2.add(camera.rotation, 'x', -Math.PI, Math.PI).name('Rotation X');
      cameraFolder2.add(camera.rotation, 'y', -Math.PI, Math.PI).name('Rotation Y');
      cameraFolder2.add(camera.rotation, 'z', -Math.PI, Math.PI).name('Rotation Z');
      cameraFolder2.open();

const cameraFolder3 = gui.addFolder('Camera Controls');
      cameraFolder3.add({ Script: 'Orbit' }, 'Script', ['Orbit', 'Trackball', 'Fly', 'FirstPerson', 'PointerLock']).onChange(setControl);
