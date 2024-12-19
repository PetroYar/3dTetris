import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

import { createCamera } from "./src/js/camera";
import { createAnimation } from "./src/js/animate";
import { createPhysicsWorld } from "./src/js/cannon";
import { createFigure } from "./src/js/figure";

const canvas = document.querySelector(".canvas");
const shapeNames = ["O", "I", "S", "Z", "L", "J", "T"];

const camera = createCamera();
const { world, addPhysicsToFigure, personBody } = createPhysicsWorld();
const orbit = new OrbitControls(camera, canvas);

const scene = new THREE.Scene();
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshBasicMaterial({ color: "#fff" })
);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);
const gridBottom = new THREE.GridHelper(40, 40);
// scene.add(gridBottom);

const personGroup = new THREE.Group();
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 3, 1),
  new THREE.MeshBasicMaterial({ color: "#1E1D1D", wireframe: true })
);
personGroup.add(player);

const gltfLoader = new GLTFLoader();
let mixer;
let numberAnimation = 1;
let model = null;
gltfLoader.load(
  "/venom.glb",
  (gltf) => {
    scene.add(gltf.scene);
    model = gltf.animations;
    gltf.scene.position.set(0, -1.6, 0);
    mixer = new THREE.AnimationMixer(gltf.scene);
    // const action = mixer.clipAction(gltf.animations[numberAnimation]);
    // action.play();
    personGroup.add(gltf.scene);
    const anim = () => {
      requestAnimationFrame(anim);
      mixer.update(0.01);
    };
    anim();
  },
  (xhr) => {
    const progress = (xhr.loaded / xhr.total) * 100;
    console.log(`Model loading: ${Math.round(progress)}% completed`);
  },
  (error) => {
    // Error callback: Handle loading errors
    console.error("An error occurred while loading the model:", error);
  }
);
personGroup.position.set(0, 1.5, 5);
personGroup.rotation.set(0, 3, 0);
scene.add(personGroup);
// light
const ambientLight = new THREE.AmbientLight("#fff", 1);

scene.add(ambientLight);

let keysPressed = {}; // Об'єкт для зберігання стану клавіш

window.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true; // Встановлюємо стан клавіші як "натиснута"
});

window.addEventListener("keyup", (e) => {
  keysPressed[e.key] = false; // Встановлюємо стан клавіші як "відпущена"
});

// Функція для оновлення позиції персонажа
function movePerson() {
  // Якщо натиснута клавіша "w" для руху вперед
  if (keysPressed["w"]) {
    if (numberAnimation !== 0) {
      numberAnimation = 0; // Зміна на анімацію для руху вперед
      const action = mixer.clipAction(model[numberAnimation]);
      action.setLoop(THREE.LoopOnce, 1); // Встановлюємо цикл на одноразовий
      action.clampWhenFinished = true; // Залишити модель в кінцевій позі після завершення анімації
      action.play(); // Запускаємо анімацію
    }
    personBody.position.z -= 0.06; // Рух вперед
  }

  // Якщо натиснута клавіша "s" для руху назад
  if (keysPressed["s"]) {
    if (numberAnimation !== 1) {
      numberAnimation = 1; // Зміна на анімацію для руху назад
      const action = mixer.clipAction(model[numberAnimation]);
      action.setLoop(THREE.LoopOnce, 1); // Встановлюємо цикл на одноразовий
      action.clampWhenFinished = true; // Залишити модель в кінцевій позі після завершення анімації
      action.play(); // Запускаємо анімацію
    }
    personBody.position.z += 0.1; // Рух назад
  }

  // Рух вліво
  if (keysPressed["a"]) {
    personBody.position.x -= 0.1;
  }

  // Рух вправо
  if (keysPressed["d"]) {
    personBody.position.x += 0.1;
  }

  // Стрибок (призначено для клавіші "пробіл")
  if (keysPressed[" "]) {
    gsap.to(personBody.position, {
      duration: 1,
      y: 4,
      ease: "power1.out",
      // onComplete: function () {
      //   // Після завершення анімації, повертаємо об'єкт назад
      //   gsap.to(personBody.position, {
      //     duration: 1,
      //     y: 1.5, // Початкова позиція
      //     ease: "power1.in",
      //   });
      // },
    });
  }
}

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
}, 4000);

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
  movePerson
);

window.addEventListener("resize", () => {
  let w = window.innerWidth;
  let h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
});
