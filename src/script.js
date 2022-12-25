import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as dat from 'lil-gui'
import { GridHelper } from 'three';
gsap.registerPlugin(ScrollTrigger);
/**
 * Base
 */
const leftBtn = document.querySelector('.left_btn')
const rightBtn = document.querySelector('.right_btn')
const btns = document.querySelectorAll('.btn')
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
        // model.position.y = -2;
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
camera.position.set(0, 0, 5)
scene.add(camera)
    //scene.add(new THREE.AxesHelper());



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

let leftDark = document.querySelector('.left_dark')
let rightDark = document.querySelector('.right_dark')

let leftText = document.querySelector('.hidden_text.left_text')
let rightText = document.querySelector('.hidden_text.right_text')
let leftTip = document.querySelector('.center_left')
let rightTip = document.querySelector('.center_right')
let btnClicked = false
window.addEventListener('mousemove', (e) => {
    //console.log(leftDark, rightDark)
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = e.clientY / sizes.height - 0.5

    const textSection = document.querySelector('.section_text');
    const observer = new IntersectionObserver(entries => {
        console.log(entries[0].intersectionRatio)
        if (entries[0].intersectionRatio == 1 && !btnClicked) {
            rectLight1.position.set(-37.66, 77.88, 31.2);
            rectLight1.rotation.set(0, 0, 0)
            rectLight1.intensity = 0.8
            if (cursor.x < 0) {
                //console.log(rightDark.style.display)
                rightDark.style.display = 'block';
                leftDark.style.display = 'none';
                rightText.style.display = 'none';
                leftText.style.display = 'flex';
                leftTip.style.display = 'none';
                rightTip.style.display = 'none';


                //gsap.from(rightDark,{opacity:0})

                if (model !== undefined) {
                    gsap.to(model.position, {
                        x: 3,
                        duration: 2
                    })
                    gsap.to(model.rotation, {
                        y: -Math.PI * 0.25,
                        duration: 2
                    })
                } else if (cursor.x === 0) {
                    rightText.style.display = 'block';
                    leftText.style.display = 'block';
                }
            } else {
                rightDark.style.display = 'none';
                leftDark.style.display = 'block';
                rightText.style.display = 'flex';
                leftText.style.display = 'none';
                leftTip.style.display = 'none';
                rightTip.style.display = 'none';
                if (model !== undefined) {
                    gsap.to(model.position, {
                        x: -3,
                        duration: 2
                    })
                    gsap.to(model.rotation, {
                        y: Math.PI * 0.25,
                        duration: 2
                    })
                }
            }
        } else {
            if (model !== undefined) {
                gsap.to(model.position, {
                    x: 0
                })
            }
            rightDark.style.display = 'none';
            leftDark.style.display = 'none';
            rightText.style.display = 'none';
            leftText.style.display = 'none';
        }
    })
    observer.observe(textSection)
        //console.log(cursor)

})







const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    console.log
    if (model !== undefined) {
        const intro = document.querySelector('.intro');
        const observer = new IntersectionObserver(entries => {

            if (entries[0].intersectionRatio > 0.1 && !btnClicked) {
                gsap.to(model.position, {
                    x: 0
                })
                gsap.to(model.rotation, {
                    y: 0
                })
                camera.position.x = -(cursor.x * Math.PI) * 0.5 * 2
                camera.lookAt(model.position)

            }

        })
        observer.observe(intro)
    }


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);




}

tick()



// start scrolltrigger

const setupAnimation = () => {
    // model.position.x = 5
    const allowScroll = () => {
        console.log('test');
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
            trigger: ".intro",
            start: "10% 10%",
            end: "+=400",
            scrub: 1,
            //markers: true
        }
    }).to(camera.position, { z: 3.5 });
    if (cursor.x < (window.innerWidth / 2)) {
        gsap.from('.left_text', {
            scrollTrigger: {
                trigger: '.left_text',
                toggleActions: "restart pause resume none",
            },
            xPercent: -100,
            opacity: 0,
            ease: 'power2.inOut',
            duration: 2,
        });
        gsap.from('.right_text', {
            scrollTrigger: {
                trigger: '.right_text',
                toggleActions: "restart pause resume none",
            },
            xPercent: 100,
            opacity: 0,
            ease: 'power2.inOut',
            duration: 2,
        });
    }

};

setupAnimation();
console.log(model);




rightBtn.addEventListener('click', (e) => {

    e.preventDefault()

    btnClicked = true
    gsap.to(model.position, {
        x: 0,
        duration: 0.5
    })
    gsap.to(model.rotation, {
        y: 0,
        duration: 0.5
    })
    setTimeout(() => {
        let vector1 = new THREE.Vector3(0.6, 0.4, 0);
        camera.lookAt(vector1);
        gsap.to(camera.position, {
            x: 0.44,
            y: 0.3,
            z: 0,
            duration: 1
        })
        gsap.to(camera.rotation, {
            x: 0.079,
            y: -0.09,
            z: 0,
            ease: 'linear',
            duration: 1
        })
    }, 400)

    rightDark.style.display = 'none';
    leftDark.style.display = 'none';
    rightText.style.display = 'none';
    leftText.style.display = 'none';
    setTimeout(() => { window.location.href = 'https://crimsonroseliving.com/' }, 1500)
})


leftBtn.addEventListener('click', (e) => {
    e.preventDefault()
    btnClicked = true
    gsap.to(model.position, {
        x: 0,
        duration: 0.5
    })
    gsap.to(model.rotation, {
        y: 0,
        duration: 0.5
    })
    let vector1 = new THREE.Vector3(-0.7, 0.4, 0);
    camera.lookAt(vector1);
    setTimeout(() => {
        gsap.to(camera.position, {
            x: -0.44,
            y: 0.3,
            z: -0.2,
            ease: 'linear',
            duration: 1
        })
        gsap.to(camera.rotation, {
            x: 0.079,
            y: 0,
            z: -0.01,
            ease: 'linear',
            duration: 1.5
        })
    }, 400)

    rightDark.style.display = 'none';
    leftDark.style.display = 'none';
    rightText.style.display = 'none';
    leftText.style.display = 'none';
    setTimeout(() => {
        window.location.href = 'https://crimsonroseliving.com/'
    }, 1000)
})


// const gui = new dat.GUI()

// const cameraControls = gui.addFolder('Camera');
// cameraControls.add(camera.position, 'x', -10, 10, 0.01).name('camera.px')
// cameraControls.add(camera.position, 'y', -10, 10, 0.01).name('camera.py')
// cameraControls.add(camera.position, 'z', -10, 10, 0.1).name('camera.pz')

// cameraControls.add(camera.rotation, 'y', -10, 10, 0.01).name('camera.Ry')
// cameraControls.add(camera.rotation, 'x', -10, 10, 0.01).name('camera.Rx')
// cameraControls.add(camera.rotation, 'z', -10, 10, 0.01).name('camera.Rz')

// const light1 = gui.addFolder('light1');
// light1.add(rectLight1.position, 'x', -100, 100, 0.01).name('rectLight1.px')
// light1.add(rectLight1.position, 'y', -100, 100, 0.01).name('rectLight1.py')
// light1.add(rectLight1.position, 'z', -100, 100, 0.1).name('rectLight1.pz')
// light1.add(rectLight1, 'intensity', 0, 10, 0.1).name('rectLight1.power')
// light1.add(rectLight1.rotation, 'y', -100, 100, 0.01).name('rectLight1.Ry')
// light1.add(rectLight1.rotation, 'x', -100, 100, 0.01).name('rectLight1.Rx')
// light1.add(rectLight1.rotation, 'z', -100, 100, 0.01).name('rectLight1.Rz')

// const light2 = gui.addFolder('light2');
// light2.add(rectLight2.position, 'x', -100, 100, 0.01).name('rectLight2.px')
// light2.add(rectLight2.position, 'y', -100, 100, 0.01).name('rectLight2.py')
// light2.add(rectLight2.position, 'z', -100, 100, 0.1).name('rectLight2.pz')
// light2.add(rectLight2, 'intensity', 0, 10, 0.1).name('rectLight2.power')
// light2.add(rectLight2.rotation, 'y', -100, 100, 0.01).name('rectLight2.Ry')
// light2.add(rectLight2.rotation, 'x', -100, 100, 0.01).name('rectLight2.Rx')
// light2.add(rectLight2.rotation, 'z', -1000, 100, 0.01).name('rectLight2.Rz')

// const light3 = gui.addFolder('light3');
// light3.add(rectLight3.position, 'x', -100, 100, 0.01).name('rectLight2.px')
// light3.add(rectLight3.position, 'y', -100, 100, 0.01).name('rectLight2.py')
// light3.add(rectLight3.position, 'z', -100, 100, 0.1).name('rectLight2.pz')
// light3.add(rectLight3, 'intensity', 0, 10, 0.1).name('rectLight3.power')
// light3.add(rectLight3.rotation, 'y', -100, 100, 0.01).name('rectLight3.Ry')
// light3.add(rectLight3.rotation, 'x', -100, 100, 0.01).name('rectLight3.Rx')
// light3.add(rectLight3.rotation, 'z', -100, 100, 0.01).name('rectLight3.Rz')