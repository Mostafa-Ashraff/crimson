import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Scene } from 'three';
import * as dat from 'lil-gui'

/**
 * Base
 */


//debug

const gui = new dat.GUI()


//textures
/*
const video = document.getElementById('video');
const texture = new THREE.VideoTexture(video);
video.addEventListener('load', () =>
{
    video.play();
    texture.needsUpdate = true
})*/
const video = document.getElementById( 'video' );
				video.play();
				video.addEventListener( 'play', function () {

					this.currentTime = 3;

				} );

let texture = new THREE.VideoTexture( video );

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const matCapTexture = textureLoader.load('/textures/matcaps/8.png')
 /*
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/Metalness.jpg')
const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')

const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

*/





// Canvas
const canvas = document.querySelector('canvas.webgl')








// Scene
const scene = new THREE.Scene();

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

/**
 * Objects
 */

const geometry = new THREE.BoxGeometry( 10, 6, 0.01 );

const material = new THREE.MeshBasicMaterial( { color: '#ffffff' } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


/*
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

*/

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})




/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 10
scene.add(camera)

// Controls/*
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //update objects
    /*sphere.rotation.y = 0.1 * elapsedTime
    
    plane.rotation.y = 0.1 * elapsedTime
    
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    
    plane.rotation.x = 0.15 * elapsedTime
    
    torus.rotation.x = 0.15 * elapsedTime*/
    // Update controls
    //controls.update()

    camera.position.x = cursor.x * 7
    camera.position.y = cursor.y * 2
    camera.lookAt(cube.position)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()







/*


import * as THREE from 'three';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { BloomPass } from 'three/addons/postprocessing/BloomPass.js';
import { CopyShader } from 'three/addons/shaders/CopyShader.js';

let container;

let camera, scene, renderer;

let video, texture, material, mesh;

let composer;

let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let cube_count;

const meshes = [],
    materials = [],

    xgrid = 20,
    ygrid = 10;

const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', function () {

    init();
    animate();

} );

function init() {

    const overlay = document.getElementById( 'overlay' );
    overlay.remove();

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 500;

    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0.5, 1, 1 ).normalize();
    scene.add( light );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    video = document.getElementById( 'video' );
    video.play();
    video.addEventListener( 'play', function () {

        this.currentTime = 3;

    } );

    texture = new THREE.VideoTexture( video );

    //

    let i, j, ox, oy, geometry;

    const ux = 1 / xgrid;
    const uy = 1 / ygrid;

    const xsize = 480 / xgrid;
    const ysize = 204 / ygrid;

    const parameters = { color: 0xffffff, map: texture };

    cube_count = 0;

    for ( i = 0; i < xgrid; i ++ ) {

        for ( j = 0; j < ygrid; j ++ ) {

            ox = i;
            oy = j;

            geometry = new THREE.BoxGeometry( xsize, ysize, xsize );

            change_uvs( geometry, ux, uy, ox, oy );

            materials[ cube_count ] = new THREE.MeshLambertMaterial( parameters );

            material = materials[ cube_count ];

            material.hue = i / xgrid;
            material.saturation = 1 - j / ygrid;

            material.color.setHSL( material.hue, material.saturation, 0.5 );

            mesh = new THREE.Mesh( geometry, material );

            mesh.position.x = ( i - xgrid / 2 ) * xsize;
            mesh.position.y = ( j - ygrid / 2 ) * ysize;
            mesh.position.z = 0;

            mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;

            scene.add( mesh );

            mesh.dx = 0.001 * ( 0.5 - Math.random() );
            mesh.dy = 0.001 * ( 0.5 - Math.random() );

            meshes[ cube_count ] = mesh;

            cube_count += 1;

        }

    }

    renderer.autoClear = false;

    document.addEventListener( 'mousemove', onDocumentMouseMove );

    // postprocessing

    const renderModel = new RenderPass( scene, camera );
    const effectBloom = new BloomPass( 1.3 );
    const effectCopy = new ShaderPass( CopyShader );

    composer = new EffectComposer( renderer );

    composer.addPass( renderModel );
    composer.addPass( effectBloom );
    composer.addPass( effectCopy );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );

}

function change_uvs( geometry, unitx, unity, offsetx, offsety ) {

    const uvs = geometry.attributes.uv.array;

    for ( let i = 0; i < uvs.length; i += 2 ) {

        uvs[ i ] = ( uvs[ i ] + offsetx ) * unitx;
        uvs[ i + 1 ] = ( uvs[ i + 1 ] + offsety ) * unity;

    }

}


function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY ) * 0.3;

}

//

function animate() {

    requestAnimationFrame( animate );

    render();

}

let h, counter = 1;

function render() {

    const time = Date.now() * 0.00005;

    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

    camera.lookAt( scene.position );

    for ( let i = 0; i < cube_count; i ++ ) {

        material = materials[ i ];

        h = ( 360 * ( material.hue + time ) % 360 ) / 360;
        material.color.setHSL( h, material.saturation, 0.5 );

    }

    
    renderer.clear();
    composer.render();

}
*/