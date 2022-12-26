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
let leftDark = document.querySelector('.left_dark')
let rightDark = document.querySelector('.right_dark')

let leftText = document.querySelector('.hidden_text.left_text')
let rightText = document.querySelector('.hidden_text.right_text')
let leftTip = document.querySelector('.center_left')
let rightTip = document.querySelector('.center_right')


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
gltfLoader.load('/models/Duck/glTF/logo.glb',
    (gltf) => {
        model = gltf.scene
        model.scale.set(1, 1, 1)
        model.rotation.y = Math.PI;
        model.receiveShadow = true;
        model.castShadow = true;
        model.children[0].intensity = 1.5
        model.children[1].intensity = 1
        model.children[2].intensity = 1
        model.children[4].children[0].material.roughness = 0.6
            // model.position.y = -2;
        scene.add(model)
        console.log(gltf.scene)
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
camera.position.set(0, 0, 20)
camera.setFocalLength(50.0)
scene.add(camera)

// scene.add(new THREE.AxesHelper());


console.log(camera.getFocalLength())
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
const rectLight1 = new THREE.RectAreaLight(0xffffff, 0.5, widthLight, heightLight);
rectLight1.position.set(-6.7, 67, 500);
scene.add(rectLight1);

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


let btnClicked = false
window.addEventListener('mousemove', (e) => {
    //console.log(leftDark, rightDark)
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = e.clientY / sizes.height - 0.5;

    const textSection = document.querySelector('.section_text');
    const observer = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio == 1 && !btnClicked) {
            rectLight1.position.set(-37.66, 77.88, 31.2);
            rectLight1.rotation.set(0, 0, 0)
            rectLight1.intensity = 0.8
            if (cursor.x < 0) {
                rightDark.style.display = 'block';
                leftDark.style.display = 'none';
                rightText.style.display = 'none';
                leftText.style.display = 'flex';
                leftTip.style.display = 'none';
                rightTip.style.display  =  'none';

                if (model !== undefined) {
                    gsap.to(model.position, {
                        x: 1.5,
                    })
                    gsap.to(model.rotation, {
                        y: 0
                    });
                    // media 
                    const mediaQueryMob = window.matchMedia('(max-width: 600px)');
                    const mediaQueryIpad = window.matchMedia('(max-width: 800px)');
                    if (mediaQueryMob.matches) {
                        rightDark.style.display = 'none';
                        leftDark.style.display = 'none';
                        gsap.to(model.position, {
                            x: 2,
                        })
                        gsap.to(model.rotation, {
                            y: 0
                        });
                    } else if (mediaQueryIpad.matches) {
                        rightDark.style.display = 'none';
                        leftDark.style.display = 'none';
                        gsap.to(model.position, {
                            x: 3.1,
                        })
                        gsap.to(model.rotation, {
                            y: 0
                        });
                    }
                }

            } else {
                rightDark.style.display = 'none';
                leftDark.style.display = 'block';
                rightText.style.display = 'flex';
                leftText.style.display = 'none';
                leftTip.style.display = 'none';
                rightTip.style.display  =  'none';
                if (model !== undefined) {
                    gsap.to(model.position, {
                        x: -1.5,
                    })
                    gsap.to(model.rotation, {
                        y: 0
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
            leftTip.style.display = 'block';
            rightTip.style.display  =  'block';
        }
    })
    observer.observe(textSection);

});

document.addEventListener('scroll', () => {
    if (model !== undefined) {
        gsap.to(model.position, {
            x: 0
        })
    }
    rightDark.style.display = 'none';
    leftDark.style.display = 'none';
    rightText.style.display = 'none';
    leftText.style.display = 'none';
    leftTip.style.display = 'block';
    rightTip.style.display  =  'block';
});




const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
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
                camera.position.x = -(cursor.x * Math.PI) * 0.5 * 10
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
    const allowScroll = () => {
        console.log('done');
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
            duration: 3,
            ease: "power2.inOut"
        },
        scrollTrigger: {
            trigger: ".intro",
            start: "10% 10%",
            end: "+=400",
            scrub: 1,
        }
    }).to(camera.position, { z: 12 });
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

// Click on button and zoom
rightBtn.addEventListener('click', (e) => {

    e.preventDefault();
    leftTip.style.display = 'none';
    rightTip.style.display  =  'none';

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
    e.preventDefault();
    leftTip.style.display = 'none';
    rightTip.style.display  =  'none';
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
    }, 1500)
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