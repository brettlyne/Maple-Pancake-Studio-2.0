import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import herbalife from './img/herbalife.png';
/**
 * Base
 */

var herbalifeImg = document.getElementById('herbalife');
herbalifeImg.src = herbalife;

// Scene
const scene = new THREE.Scene();

/**
 * Models
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/models/maple-pancakes.glb', (gltf) => {
  console.log(gltf);
  //   gltf.scene.scale.set(1, 3, 3);
  scene.add(gltf.scene);
  renderer.render(scene, camera);
});

// Lights
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 1;
scene.add(ambientLight);

// Sizes
const sizes = {
  width: 100,
  height: 100,
};

// Camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height);
camera.position.set(2, 3, 10);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl'),
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animations

const overlay = document.getElementById('overlay');

window.addEventListener('load', (event) => {
  gsap.to('.overlay', {
    width: 0,
    delay: 3,
    ease: 'power2.inOut',
    duration: 1.7,
  });

  gsap.from('.overlay-h1', {
    opacity: 0,
    delay: 1,
    y: 100,
    duration: 0.5,
  });
});

gsap.from('.boutique', {
  opacity: 0,
  delay: 4,
  ease: 'power2',
  y: 20,
  duration: 0.8,
});

// Scroll trigger animations
gsap.to('img', {
  scrollTrigger: 'img', // start the animation when ".box" enters the viewport (once)
  duration: 1,
  scale: 0.8,
});
