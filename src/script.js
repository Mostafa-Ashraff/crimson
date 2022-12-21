// import './style.css'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
// import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
// import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);
// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI()

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()


// /**
//  * Models
//  */

// const gltfLoader = new GLTFLoader()
// console.log(gltfLoader)
// let model;
// console.log(model)
// gltfLoader.load('/models/Duck/glTF/Logo.gltf',
// (gltf) =>
// {   model = gltf.scene
//     gltf.scene.scale.set(0.01, 0.01, 0.01)
//     gltf.scene.rotation.y = Math.PI 
//     //gltf.scene.rotation.z = -Math.PI *0.01
//     gltf.scene.position.y = 0 
//     scene.add(gltf.scene)
//     console.log(gltf.scene)
// })


// //cursor

// const cursor ={
//     x:0,
//     y:0
// }

// window.addEventListener('mousemove', (e)=>{
//     cursor.x = e.clientX / sizes.width - 0.5
//     cursor.y = e.clientY / sizes.height - 0.5
    
// })



// /**
//  * Floor

// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.MeshStandardMaterial({
//         color: '#444444',
//         metalness: 0,
//         roughness: 0.5
//     })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)
//  */
// /**
//  * Lights
//  */
// // const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
// // scene.add(ambientLight)
// /*
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
// directionalLight.intensity =1
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(5, 5, 5)
// scene.add(directionalLight)
// */
// // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
// // directionalLight.castShadow = true
// // directionalLight.shadow.mapSize.set(1024, 1024)
// // directionalLight.shadow.camera.far = 10
// // directionalLight.shadow.camera.left =  7
// // directionalLight.shadow.camera.top = 7
// // directionalLight.shadow.camera.right =7
// // directionalLight.shadow.camera.bottom = 7
// // directionalLight.position.set(2, -40.75, 170)
// // scene.add(directionalLight)
// const widthLight =404;
// const heightLight = 280;
// RectAreaLightUniformsLib.init();
// const rectLight1 = new THREE.RectAreaLight( 0xffffff, 2, widthLight, heightLight );
// 				rectLight1.position.set( -6.7, 67, 500 );
// 				scene.add( rectLight1 );

// 				const rectLight2 = new THREE.RectAreaLight( 0xffffff, 1, widthLight, heightLight );
// 				rectLight2.position.set( -527, 197, -23);
// 				scene.add( rectLight2 );

// 				const rectLight3 = new THREE.RectAreaLight( 0xffffff, 1, widthLight, heightLight );
// 				rectLight3.position.set(623, 197, 23);
// 				scene.add( rectLight3 );

// 				scene.add( new RectAreaLightHelper( rectLight1 ) );
// 				scene.add( new RectAreaLightHelper( rectLight2 ) );
// 				scene.add( new RectAreaLightHelper( rectLight3 ) );
// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(2, 1, 4)
// scene.add(camera)
// scene.add( new THREE.AxesHelper());
// // Controls

// // const controls = new OrbitControls(camera, canvas)
// // controls.target.set(0, 0.75, 0)
// // controls.enableDamping = true

// /**
//  * Renderer
//  * 
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let previousTime = 0

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - previousTime
//     previousTime = elapsedTime


//     if(model !== undefined){
//         camera.position.x = cursor.x * Math.PI *0.5* 2 
//         //camera.position.y =- (cursor.y * Math.PI *0.1) 
        
//         camera.lookAt(model.position)
//     }

//     // Update controls
//     //controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()


// if(model !== undefined){
    
// let tl = gsap.timeline()
// tl.to(model.position,{

//      y: 10

//     ,scrollTrigger: {
//         trigger: model,
//         start: "top 20%",  
//         //end: "+=400",
//         scrub: true, 
//         markers: true
//     }
// })

// }


import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
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
console.log(gltfLoader)
let model;
console.log(model)
gltfLoader.load('/models/Duck/glTF/Logo.gltf',
(gltf) =>
{   model = gltf.scene
    gltf.scene.scale.set(0.01, 0.01, 0.01)
    gltf.scene.rotation.y = Math.PI 
    //gltf.scene.rotation.z = -Math.PI *0.01
    //gltf.scene.position.y = 0 
    scene.add(gltf.scene)
    console.log(gltf.scene)
})





/**
 * Floor

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)
 */
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)
/*
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.intensity =1
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)
*/
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 10
// directionalLight.shadow.camera.left =  7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right =7
// directionalLight.shadow.camera.bottom = 7
// directionalLight.position.set(2, -40.75, 170)
// scene.add(directionalLight)



//const rectLightHelper = new RectAreaLightHelper( rectLight );


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 1, 4)
scene.add(camera)
scene.add( new THREE.AxesHelper());
// Controls

// const controls = new OrbitControls(camera, canvas)

// controls.target.set(0, 0.75, 0)
// controls.enableDamping = true
// controls.enabled = true
// controls.autoRotate = true
//  controls.enableZoom = true
// controls.enablePan = true
// controls.dampingFactor = 0.01
// controls.update();


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



/*
const rectLight1 = new THREE.DirectionalLight( 0xffffff, 2);
rectLight1.position.set(-6.7, 7, 5)
const rectLight2 = new THREE.DirectionalLight( 0xffffff, 1);
rectLight2.position.set(-527, 197, 23)
const rectLight3 = new THREE.DirectionalLight( 0xffffff, 1);
rectLight3.position.set(623, 197, 23)*/
/*
const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
scene.add(rectAreaLight)
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
if(model !== undefined){

rectLight1.lookAt( model.position );
rectLight2.lookAt( model.position );
rectLight3.lookAt( model.position );
}

scene.add( rectLight1, rectLight2, rectLight3 )

*/

const widthLight =404;
const heightLight = 280;
RectAreaLightUniformsLib.init();
const rectLight1 = new THREE.RectAreaLight( 0xffffff, 2, widthLight, heightLight );
				rectLight1.position.set( -6.7, 67, 500 );
				scene.add( rectLight1 );

				const rectLight2 = new THREE.RectAreaLight( 0xffffff, 1, widthLight, heightLight );
				rectLight2.position.set( -527, 197, -23);
				scene.add( rectLight2 );

				const rectLight3 = new THREE.RectAreaLight( 0xffffff, 1, widthLight, heightLight );
				rectLight3.position.set(623, 197, 23);
				scene.add( rectLight3 );

				scene.add( new RectAreaLightHelper( rectLight1 ) );
				scene.add( new RectAreaLightHelper( rectLight2 ) );
				scene.add( new RectAreaLightHelper( rectLight3 ) );
/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
//cursor

const cursor ={
  x:0,
  y:0
}

window.addEventListener('mousemove', (e)=>{
  cursor.x = e.clientX / sizes.width - 0.5
  cursor.y = e.clientY / sizes.height - 0.5
  
})

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    if(model !== undefined){
        camera.position.x = cursor.x * Math.PI *0.5* 2 
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

/*
if(model !== undefined){
    
let tl = gsap.timeline()
tl.to(model.position,{

     y: 10

    ,scrollTrigger: {
        trigger: model,
        start: "top 20%",  
        //end: "+=400",
        scrub: true, 
        markers: true
    }
})



ScrollTrigger.defaults({
    scrub: 3,
    ease: 'none',
  })
  const sections = document.querySelectorAll('.section')
  gsap.from(model.position, {
    y: 1,
    duration: 1,
    ease: 'expo',
  })
  gsap.from('h1', {
    yPercent: 100,
    autoAlpha: 0,
    ease: 'back',
    delay: 0.3,
  })
  gsap.to(model.rotation, {
    y: Math.PI * 2,
    scrollTrigger: {
      trigger: sections[1],
    },
  })
  gsap.to(model.scale, {
    x: 2,
    y: 2,
    scrollTrigger: {
      trigger: sections[2],
    },
  })
  gsap.to(model.rotation, {
    y: Math.PI * 2,
    scrollTrigger: {
      trigger: sections[3],
    },
  })}

  */



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
	});
	
	// // Title Section 	

	// tl.to(model.position, { y: 1.5 }, section);
    // tl.to(model.scale, { x: 1, y:1, z:1 }, section);
	// tl.to(cameraTarget, {y:1}, section)
	// tl.to(cameras.position, {z:5, ease: "power2.out" }, section)

	// // Bear Stats
	
	// section += 1;
	// tl.to(witches.position, { x: 5, ease: "power4.in" }, section);
	// tl.to(bears.position, { z: 2 }, section);
	// tl.to(views[1], {height:1,ease: 'none'}, section)

	// // Witch Stats
	
	// section += 1;
	// section += 1;
	// tl.to(witches.position, { x: 1, z: 2, ease: "power4.out" }, section);
	// tl.to(bears.position, { z: 0, x: -5, ease: "power4.in" }, section);

	// // Winner
	
	// section += 1;
	// section += 1;
	// tl.to(witches.position, { x: 1, z: 0 }, section);
	// tl.to(bears.position, { x: -1, z: 0 }, section);
	// tl.to(views[1], { height: 0, bottom: 1, ease: 'none'}, section)
	
	
};
