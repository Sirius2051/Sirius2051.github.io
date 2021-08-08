// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.position.z = 4;
camera.updateProjectionMatrix();

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: false});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0x041939);
document.body.insertBefore( renderer.domElement , document.body.firstElementChild);

// Controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener( window );
controls.enableDamping=true;
controls.dampingFactor=0.05;
controls.enableZoom=false;
controls.screenSpacePanning=false;
controls.rotateSpeed=2;
controls.enablePan=false;
controls.target = new THREE.Vector3(0,0,0);
controls.autoRotateSpeed=1;
controls.autoRotate = true;

// Nucleus
const nucleus = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.4, 0.03, 300, 200, 3, 7),
    new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 0.99,
        side: THREE.BackSide
    }) );
scene.add(nucleus);
// Dodecahedron

const dodecahedron = new THREE.Mesh(
    new THREE.DodecahedronGeometry(1, 0),
    new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 0.7,
    }) );
scene.add(dodecahedron);

// Lines
for (let i = 5; i < 8; i++){
    console.log(i)
    const dodecahedron = new THREE.Mesh(
        new THREE.TorusKnotGeometry(i+0.4, i+0.05, 100, 70, 4, 7),
        new THREE.MeshNormalMaterial({
            wireframe: true,
            transparent: true,
            opacity: 0.3,
            side: THREE.BackSide

        }) );
    scene.add(dodecahedron);
}

// Animete
function animate(){
    requestAnimationFrame(animate);
    nucleus.rotation.x += 0.008;
    nucleus.rotation.y -= 0.008;
    nucleus.rotation.z -= 0.008;

    dodecahedron.rotation.x -= 0.008;
    dodecahedron.rotation.y += 0.008;
    dodecahedron.rotation.z += 0.008;
    renderer.render(scene,camera);
    controls.update();
}
animate();

// Resize
window.addEventListener('resize',function(){
    renderer.setSize(innerWidth,innerHeight);
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
});
