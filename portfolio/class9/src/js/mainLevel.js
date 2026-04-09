import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f9fa);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate( time ) {

  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  renderer.render( scene, camera );

}
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