var scene    = null,
    camara   = null,
    render   = null,
    controls = null;

var cube = null;

function start() {
    window.onresize = onWindowResize;
    initScene();
    animate();
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xD7F0F7 );
    scene.fog = new THREE.FogExp2( 0x9db3b5, 0.002 );

    camera = new THREE.PerspectiveCamera( 
        75,                                     // Ángulo "grabación" - De abaja -> Arriba 
        window.innerWidth / window.innerHeight, // Relación de aspecto 16:9
        1,                                    // Mas cerca (no renderiza) 
        10000                                    // Mas lejos (no renderiza)
    );

    // renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#app") });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 1, 2 );
    controls.update();

    // Grid Creation 
    var size = 50;
    var divisions = 50;

    var gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    var axesHelper = new THREE.AxesHelper( 1 );
    scene.add( axesHelper );



    //////
    var geo = new THREE.BoxGeometry( 1, 1, 1 );     
    geo.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
    var mat = new THREE.MeshPhongMaterial( { color: 0xcccccc, flatShading: true } );

    for ( var i = 0; i < 300; i ++ ) {
        var building = new THREE.Mesh( geo.clone(), mat.clone() );
        building.position.x = Math.floor( Math.random() * 200 - 100 ) * 8;
        building.position.z = Math.floor( Math.random() * 200 - 100 ) * 8;
        building.scale.x = Math.random() * 50 + 10;
        building.scale.y = Math.random() * building.scale.x * 8 + 8;
        building.scale.z = building.scale.x;
        scene.add( building );
    }

    camera.position.y = 400;
    camera.position.z = 400;
    camera.rotation.x = -45 * Math.PI / 180;


    var ground = new THREE.PlaneGeometry( 2000, 2000, 20, 20 );
    var groundMaterial = new THREE.MeshBasicMaterial( { color: 0x9db3b5, overdraw:true } );
    var groundMesh = new THREE.Mesh( ground, groundMaterial );
    groundMesh.rotation.x = -90 * Math.PI / 180;
    scene.add( groundMesh );

    var light = new THREE.DirectionalLight( 0xf6e86e, 1 );
    light.position.set( 1, 3, 2 );
    scene.add( light ); 

}

function animate() {
    requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function getBuildingData() {
    var message = 'Ingrese el número de edificios a crear: ';
    var datas = prompt(message,"3");

    // Este parte lo hace la cantidad de veces (segun la cantidad de edificios)
    var message2 = 'Ingrese el número de pisos, color y wireframe del edificio #?: ';
    var datas2 = prompt(message2,"3,ff0000,false");

    var values = cleanParamsUI(datas2, ',');

    alert.log("Numero de pisos: "+values[0]);
    alert.log("Color: "+values[1]);
    alert.log("Wireframe: "+values[2]);

    drawElement();
}

function drawElement() {

    // box, plane
    // aqui va toda la logica de dibujar el edificio, usando los datos que se ingresaron en el prompt
    alert("creo el edificio con los datos ingresados");
}

function cleanParamsUI(datos, marker) {
    value = datos.split(marker);
    for(var i=0; i<value.length; i++){
        value[i] = parseFloat(value[i]);
    }
    return value;
}



