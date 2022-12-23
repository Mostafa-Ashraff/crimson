import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as dat from 'lil-gui'
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
camera.position.set(0, 1, 5)
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

let leftText = document.querySelector('.left_text')
let rightText = document.querySelector('.right_text')
let btnClicked = false
window.addEventListener('mousemove', (e) => {
    //console.log(leftDark, rightDark)
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = e.clientY / sizes.height - 0.5

    const textSection = document.querySelector('.section_text');
    const observer = new IntersectionObserver(entries =>{
        console.log(entries[0].intersectionRatio)
        if(entries[0].intersectionRatio > 0.95 && !btnClicked){
            
            if(cursor.x<0){
                //console.log(rightDark.style.display)
                rightDark.style.display = 'block';
                leftDark.style.display = 'none';
                rightText.style.display = 'none';
                leftText.style.display = 'block';
            }else{
                rightDark.style.display = 'none';
                leftDark.style.display = 'block';
                rightText.style.display = 'block';
                leftText.style.display = 'none';
            }
    }else{
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
        const observer = new IntersectionObserver(entries =>{
            
            if(entries[0].intersectionRatio >0.1){
                
                camera.position.x = -(cursor.x * Math.PI) * 0.5 * 2
                camera.lookAt(model.position)
            }else{
                //camera.position.x = 0
                camera.lookAt(model.position)
            }
        })
        observer.observe(intro)


        //camera.position.x = -(cursor.x * Math.PI) * 0.5 * 2
                camera.lookAt(model.position)
    }

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);


    // const intersects = raycaster.intersectObject(model);
    // console.log('in', intersects);
    // // raycaster.setFromCamera(mouse, camera);

    // if (intersects.length) {
    //     console.log('1');
    // } else {
    //     console.log('2');
    // }




}

tick()



// start scrolltrigger

const setupAnimation = () => {
    // model.position.x = 5
    const allowScroll = () => {
        // gsap.timleline({
        //         ScrollTrigger: {
        //             trigger: '.page',
        //             start: 'top bottom',
        //             end: 'top top',
        //             scrub: 0.1
        //         }
        //     })
        //     .to(camera.position, { x: 2, y: 1, z: 3.5 })
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
    }).to(camera.position, {  z: 3.5 });
    if(cursor.x < (window.innerWidth /2)){
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



// click event (ٌRaycaster)

// const selectedHalf = null;


// function onClick(event) {
//     console.log(model.children[0]);
//     // gsap.to(model.position, { duration: 2, x: '10px', ease: 'power2.in' });

//     // raycaster.setFromCamera(mouse, camera);
//     // let intersects = raycaster.intersectObject(scene.children);
//     // console.log('in = ', intersects);
//     // if (intersects > 0) {
//     //   // selectedHalf= intersects[0].object.userData
//     // }



// }

// cast a ray
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2;
// let currentIntersect = null;


// window.addEventListener('click', () => {
//     if (currentIntersect) {
//         console.log('1');
//     } else {
//         console.log('no');
//         // gsap.to(model.position, { x: 1 })
//     }

// });

// function updateCamera(ev) {
//     // let div1 = document.getElementById("div1");
//     camera.position.x = 10 - window.scrollY / 500.0;
//     camera.position.z = 10 - window.scrollY / 500.0;
// }

// window.addEventListener("scroll", updateCamera);

// const gltfLoader = new GLTFLoader(LoadingManager);


rightBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    btnClicked =true
    gsap.to(camera.position, {
        x: 0.58,
        y:1.45,
        z:0.74,
        duration: 2
    })
    rightDark.style.display = 'none';
    leftDark.style.display = 'none';
    rightText.style.display = 'none';
    leftText.style.display = 'none';
    window.location.href ='https://crimsonroseliving.com/'
})


leftBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    btnClicked = true
    gsap.to(camera.position, {
        x: -0.93,
        y:1.27,
        z:0.22,
        duration: 1.5
    })
    rightDark.style.display = 'none';
    leftDark.style.display = 'none';
    rightText.style.display = 'none';
    leftText.style.display = 'none';
    window.location.href ='https://crimsonroseliving.com/'
})



// const gui = new dat.GUI()
// gui.add(camera.position, 'x', - 10, 10, 0.01).name('camera.px')
// gui.add(camera.position, 'y', - 10, 10, 0.01).name('camera.py')
// gui.add(camera.position, 'z', - 10, 10, 0.01).name('camera.pz')

// gui.add(camera.rotation, 'y', - 10, 10, 0.01).name('camera.Ry')
// gui.add(camera.rotation, 'x', - 10, 10, 0.01).name('camera.Rx')
// gui.add(camera.rotation, 'z', - 10, 10, 0.01).name('camera.Rz')