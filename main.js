import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import * as dat from "dat.gui";

import { createScene } from "./src/js/scene";
import { createCamera } from "./src/js/camera";
import { createAnimation } from "./src/js/animate";
import { createPhysicsWorld } from "./src/js/cannon";
import { createFigure } from "./src/js/figure";

const canvas = document.querySelector(".canvas");
const shapeNames = ["O", "I", "S", "Z", "L", "J", "T"];

const camera = createCamera();
const { world, addPhysicsToFigure, personBody } = createPhysicsWorld();
const orbit = new OrbitControls(camera, canvas);

const { scene, personGroup } = createScene();
const figures = [];

let counter = 0;
const test = () => {
  const randomForm = Math.floor(Math.random() * shapeNames.length);
  const figure = createFigure(shapeNames[randomForm]); // створюємо фігуру
  const physics = addPhysicsToFigure(shapeNames[randomForm]); // додаємо фізику
  scene.add(figure);
  counter++;
  figures.push({ figure, physics }); // додаємо фігуру до масиву
  console.log(counter);
};
// window.addEventListener("keydown", (e) => {
//   const lastFigure = figures[figures.length - 1].physics;

//   if (e.key === "d" && figures.length > 0) {
//     lastFigure.position.x += 0.5;
//   } else if (e.key === "a") {
//     lastFigure.position.x -= 0.5;
//   } else if (e.key === " ") {
//     lastFigure.quaternion.z -= 1;
//   }else if (e.key === 's'){
//     lastFigure.position.y -= 1;

//   }
// });

// document.getElementById("moveLeft").addEventListener("click", () => {
//   const lastFigure = figures[figures.length - 1].physics;
//   lastFigure.position.x -= 0.5;
// });

// document.getElementById("moveRight").addEventListener("click", () => {
//   const lastFigure = figures[figures.length - 1].physics;
//   lastFigure.position.x += 0.5;
// });

// document.getElementById("rotate").addEventListener("click", () => {
//   const lastFigure = figures[figures.length - 1].physics;
//   lastFigure.quaternion.z -= 1;
// });

setInterval(() => {
  test();
}, 10000);

let keysPressed = {}; // Об'єкт для зберігання стану клавіш

window.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true; // Встановлюємо стан клавіші як "натиснута"
});

window.addEventListener("keyup", (e) => {
  keysPressed[e.key] = false; // Встановлюємо стан клавіші як "відпущена"
});

// Функція для оновлення позиції персонажа
function movePerson() {
  if (keysPressed["w"]) {
    personBody.position.z -= 0.1; // Рух вперед
  }
  if (keysPressed["s"]) {
    personBody.position.z += 0.1; // Рух назад
  }
  if (keysPressed["a"]) {
    personBody.position.x -= 0.1; // Рух вліво
  }
  if (keysPressed["d"]) {
    personBody.position.x += 0.1; // Рух вправо
  }
}


// renderer
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// mesh
createAnimation(
  renderer,
  scene,
  camera,
  world,
  figures,
  personBody,
  personGroup,
  movePerson,
 
);

window.addEventListener("resize", () => {
  let w = window.innerWidth;
  let h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
});
