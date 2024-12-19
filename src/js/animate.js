import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";

const stats = new Stats();
document.body.appendChild(stats.dom);
export const createAnimation = (
  renderer,
  scene,
  camera,

  world,
  figures,
  personBody,
  personGroup,
  movePerson
) => {
  const timeStep = 1 / 60;
const cameraOffset = new THREE.Vector3(0, 1.5, 6); // Відстань камери від моделі (по осі Z на -3, по осі Y — на 1.5)

function updateCameraPosition() {
  // Оновлюємо позицію камери, додаючи offset до позиції моделі
  camera.position.copy(personGroup.position).add(cameraOffset);

  // Камера повинна завжди дивитися на точку перед моделлю
  // В даному випадку камера буде дивитися на точку, яка знаходиться на висоті 2 одиниць (можна налаштувати)
  camera.lookAt(
    personGroup.position.x,
    personGroup.position.y + 2,
    personGroup.position.z 
  );
}
const animate = () => {
  requestAnimationFrame(animate);
  movePerson();

    figures.forEach(({ figure, physics }) => {
      // Оновлення позиції фігури в сцені
      figure.position.copy(physics.position);
      figure.quaternion.copy(physics.quaternion);
    });
    updateCameraPosition();
    personGroup.quaternion.copy(personBody.quaternion);
    personGroup.position.copy(personBody.position);
    stats.update();

    world.step(Math.min(timeStep, 0.1));

    renderer.render(scene, camera);
  };

  animate(); // Запуск анімації
};
