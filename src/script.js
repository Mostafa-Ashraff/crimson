import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Models
 */

const gltfLoader = new GLTFLoader()
    // console.log(gltfLoader)
let model;
gltfLoader.load('/models/Duck/glTF/Logo.gltf',
    (gltf) => {
        model = gltf.scene
        model.scale.set(0.01, 0.01, 0.01)
        model.rotation.y = Math.PI;
        model.receiveShadow = true;
        model.castShadow = true;
        scene.add(model)
            // console.log(gltf.scene)
    })





//  * Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 1, 5)
scene.add(camera)
    // scene.add(new THREE.AxesHelper());



/**
 * Renderer
 * 
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




const widthLight = 404;
const heightLight = 280;

// lights
RectAreaLightUniformsLib.init();
const rectLight1 = new THREE.RectAreaLight(0xffffff, 2, widthLight, heightLight);
rectLight1.position.set(-6.7, 67, 500);
scene.add(rectLight1);

const rectLight2 = new THREE.RectAreaLight(0xffffff, 1, widthLight, heightLight);
rectLight2.position.set(-527, 197, -23);
scene.add(rectLight2);

const rectLight3 = new THREE.RectAreaLight(0xffffff, 1, widthLight, heightLight);
rectLight3.position.set(623, 197, 23);
scene.add(rectLight3);

scene.add(new RectAreaLightHelper(rectLight1));
scene.add(new RectAreaLightHelper(rectLight2));
scene.add(new RectAreaLightHelper(rectLight3));
/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
    //cursor

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = e.clientY / sizes.height - 0.5

})

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    if (model !== undefined) {
        camera.position.x = cursor.x * Math.PI * 0.5 * 2
            //camera.position.y =- (cursor.y * Math.PI *0.1) 

        camera.lookAt(model.position)
    }

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)


}

tick()
    // start scrolltrigger

const setupAnimation = () => {
    const allowScroll = () => {
        gsap.timleline({
                ScrollTrigger: {
                    trigger: '.page',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1
                }
            })
            .to(camera.position, { x: 2, y: 1, z: 4 })
    }

    gsap.timeline({ onComplete: allowScroll })
        .from('.webgl', { opacity: 0 })
        .duration(2)
    desktopAnimation()
};


const desktopAnimation = () => {
    let section = 0;
    const tl = gsap.timeline({
        default: {
            duration: 1,
            ease: "power2.inOut"
        },
        scrollTrigger: {
            trigger: ".page",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1,
            markers: true
        }
    }).to(camera.position, { x: 2, y: 1, z: 3.5 })



};

setupAnimation();

// const gltfLoader = new GLTFLoader(LoadingManager);