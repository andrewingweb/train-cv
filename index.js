import * as THREE from "./js/three.module.js";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.querySelector("#bg");
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0xffe8dc);
const railwayPicture = new THREE.TextureLoader().load(
  "../dist/public/background.jpg"
);
scene.background = railwayPicture;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.setZ(20);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const pointLight = new THREE.PointLight(0xbf408f);
pointLight.position.set(5, -28.5, 5);

const pointLight2 = new THREE.PointLight(0x00ffff);
pointLight2.position.set(5, 5, 5);

const ambient = new THREE.AmbientLight(0xff0000, 1);
scene.add(ambient);

scene.add(pointLight, pointLight2);

const andrewTexture = new THREE.TextureLoader().load("../dist/public/andrew.jpg");

const andrew = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: andrewTexture })
);

scene.add(andrew);

//add object or shape
const shapeGeo = new THREE.OctahedronBufferGeometry(1, 0);
const shapeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
const shapeMesh = new THREE.Mesh(shapeGeo, shapeMat);
scene.add(shapeMesh);

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("../dist/public/normal-map.jpeg");
const textureMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.7,
  roughness: 0.2,
  normalMap: normalTexture,
  emissive: 0x9152cc,
});

const ballGeo = new THREE.SphereBufferGeometry(4, 64, 64);
const ball = new THREE.Mesh(ballGeo, textureMaterial);
scene.add(ball);
ball.position.z = 0;
ball.position.setX(-10);

andrew.position.z = -5;
andrew.position.y = 0.32;
andrew.position.x = 2;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.x += 0.05;
  camera.position.y += 0.075;
  camera.position.z += 0.05;

  andrew.rotation.y += 0.01;
  andrew.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
//const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  ball.rotateY(0.004);
  andrew.rotateY(0.004);

  //controls.update();
  renderer.render(scene, camera);
}
animate();
