import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as dat from "dat.gui";

import { createScene } from "./src/js/scene";
import { createCamera } from "./src/js/camera";
import { createAnimation } from "./src/js/animate";
import { createPhysicsWorld } from "./src/js/cannon";
import { createFigure } from "./src/js/figure";

const canvas = document.querySelector(".canvas");
const shapeNames = ["O", "I", "S", "Z", "L", "J", "T"];

const camera = createCamera();
const {world,addPhysicsToFigure} = createPhysicsWorld()
const orbit = new OrbitControls(camera,canvas)

const { scene} = createScene();
const figures = [];
window.addEventListener("keydown", (e) => {
  if (e.key === "w") {
    // Перевірка, чи є хоча б одна фігура в масиві
 
      const lastFigure = figures[figures.length - 1];

      // Збільшуємо обертання останньої фігури по осі X
      lastFigure.figure.rotation.x += 1; // Невеликий крок обертання
    
  }
});
// Створення декількох фігур та додавання їх до світу
const test = ()=>{
  const randomForm = Math.floor(Math.random()*shapeNames.length)
  const figure = createFigure(shapeNames[randomForm]); // створюємо фігуру
  const physics = addPhysicsToFigure(shapeNames[randomForm]); // додаємо фізику
  scene.add(figure)
  figures.push({ figure, physics }); // додаємо фігуру до масиву
}
window.addEventListener("keydown", (e) => {
  const lastFigure = figures[figures.length - 1].physics;
  
  if (e.key === "d" && figures.length > 0) {
    lastFigure.position.x += 0.5;
  }else if (e.key === 'a'){
     lastFigure.position.x -= 0.5;
  }else if (e.key ===' '){
     lastFigure.quaternion.z -= 1;

  }

});

setInterval(() => {
  test()
}, 3000);
// const figure = createFigure("Z");
//   const physics = addPhysicsToFigure("Z");



// renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// mesh
createAnimation(renderer,scene,camera,world,figures);

window.addEventListener("resize", () => {
  let w = window.innerWidth;
  let h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
});

