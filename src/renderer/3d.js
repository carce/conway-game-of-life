const THREE = require('three');
window.THREE = THREE;
require('three/examples/js/controls/OrbitControls.js')

const Stats = require('stats.js');
let stats;

let canvas;
let ctx;
let scene, camera, renderer, controls, id, map3d;
let ray, mouse, theLight, plane;
let particles;

const WIDTH = 100;
const HEIGHT = 100;

/**
 * Get canvas and set it's size.
 */
exports.init = () => {
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    scene = new THREE.Scene();
    window.scene = scene;
    canvas = document.getElementById('game')

    // setTimeout(() => cancelAnimationFrame(id), 1000 * 10);
    // ctx = canvas.getContext('2d')

    // canvas.width = window.innerWidth / 5
    // canvas.height = window.innerHeight / 5


    renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas});
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    // alert(window.innerWidth + ' ' + window.innerHeight)
    renderer.setClearColor(0x333F47, 1);
    renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
    camera.position.set(WIDTH/2, Math.max(WIDTH, HEIGHT)/2, -HEIGHT/2);
    // camera.lookAt(WIDTH/2, HEIGHT*2/5, 0);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(WIDTH/2, 0, HEIGHT/2);
    controls.dampingFactor = 0.25;
    controls.enableDamping = true;
    controls.enableKeys = true;
    controls.minDistance = 20;
    controls.maxDistance = Math.max(WIDTH, HEIGHT)*2;
    controls.maxPolarAngle = Math.PI / 2 * 99 / 100;
    controls.autoRotateSpeed = 0.1;
    controls.autoRotate = true;

    let timeout;
    canvas.addEventListener('mousedown', function(e) {
        controls.autoRotate = false;
        if (timeout) clearTimeout(timeout);
    })
    canvas.addEventListener('mouseup', function(e) {
        timeout = setTimeout(() => controls.autoRotate = true, 10000);
    })
    controls.update();
    scene.add(camera);

    // let light = new THREE.PointLight(0xffffff);
    // light.position.set(-100,200,100);
    // scene.add(light);

    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // let particleGeom = new THREE.Geometry();
    // let particleMaterial = new THREE.PointsMaterial({color: 0x888888, size: 1});

    var geometryCube = new THREE.BoxGeometry(1, 1, 1);
    let materials = [];
    for (let i = 0; i < 20; i++) {
        let color = Math.random()*0xFFFFFF & 0xFFFF00 | 0x445533;
        materials.push(new THREE.MeshLambertMaterial({
            color: color
        }))
    }
    map3d = [];
    for (let i = 0; i < WIDTH; i++) {
        map3d[i] = [];
        for (let j = 0; j < HEIGHT; j++) {
            
            var cube = new THREE.Mesh( geometryCube, materials[THREE.Math.randInt(0,19)]);
            cube.position.z = j;
            cube.position.x = i;
            cube.position.y = THREE.Math.randFloat(-0.3, 0);
            cube.name = 'Cube';
            cube.castShadow = true;
            // cube.receiveShadow = true;
            map3d[i][j] = cube;
            // let point = new THREE.Vector3(i, 1, j);
            // particleGeom.vertices.push(point);
        }
    }

    // particles = new THREE.Points(particleGeom, particleMaterial);
    // scene.add(particles);


    var geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT);
    var material = new THREE.MeshPhongMaterial({
        color: 0xBBCCAA,
    });
    plane = new THREE.Mesh( geometry, material );
    plane.rotateX(-Math.PI / 2);
    plane.position.set(WIDTH/2 - 0.5, -0.5, HEIGHT/2 - 0.5);
    plane.receiveShadow = true;
    scene.add( plane );

    let light = new THREE.PointLight(0xffffff, 0.5, Math.max(WIDTH, HEIGHT));
    light.position.set(WIDTH/2, 20, HEIGHT/2);
    light.castShadow = true;
    light.shadow.mapSize.width = 128;  // default
    light.shadow.mapSize.height = 128; // default
    light.shadow.camera.near = 0.5;       // default
    light.shadow.camera.far = 500;      // default
    scene.add(light);
    theLight = light;
    ray = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    var bglight = new THREE.AmbientLight( 0x404040 , 2); // soft white light
    scene.add( bglight );

    // var helper = new THREE.CameraHelper( light.shadow.camera );
    // scene.add( helper );

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener( 'mousemove', onMouseMove, false );
    animate();
}

/**
 * Get size of the canvas
 */
exports.getSize = () => {
    return {
        width: WIDTH,
        height: HEIGHT
    }
}

/**
 * Draw the map
 *
 * @param {Array<Array<number>>} nextMap Map to be drawn
 * @param {Array<Array<number>>} previousMap Unused previous state of the map
 */
exports.paint = (nextMap, previousMap) => {
    // particles.geometry.vertices.forEach(vec => {
    //     vec.y += Math.random()*0.2;
    // })
    // particles.geometry.verticesNeedUpdate = true;

    for (let i = 0; i < nextMap.length; i++) {
        for (let j = 0; j < nextMap[0].length; j++) {
            if (previousMap && previousMap[i][j] == nextMap[i][j]) {
                if (nextMap[i][j] === 1) {
                    // map3d[i][j].scale.set(1,1,1);
                }
                else {
                    scene.remove(map3d[i][j]);
                }
                continue;
            }
            if (nextMap[i][j] === 1) {
                // map3d[i][j].scale.set(0.5, 0.5, 0.5);

                map3d[i][j].scale.set(1,1,1);
                scene.add(map3d[i][j]);
            }
            else {
                map3d[i][j].scale.set(0.5, 0.5, 0.5);                
                // scene.remove(map3d[i][j]);
            }
        }
    }

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function limitTarget(obj, distX, distZ) {
    if (obj.x < 0) obj.x = 0;
    if (obj.x > distX) obj.x = distX;
    if (obj.z < 0) obj.z = 0;
    if (obj.z > distZ) obj.z = distZ;
}

function animate() {
    stats.begin();
    limitTarget(controls.target, WIDTH, HEIGHT);
    controls.update();

    ray.setFromCamera( mouse, camera );

    let intersections = ray.intersectObject(plane)
    if (intersections[0]) {
        // console.log(theLight.position, intersections[0].point)
        theLight.position.copy(intersections[0].point)
        theLight.position.y = 20;
    }
    renderer.render(scene, camera);
    stats.end();
    id = requestAnimationFrame(animate);
}