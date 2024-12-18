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
  movePerson,
  updateCamera
) => {
  const timeStep = 1 / 60;

  const animate = () => {
    requestAnimationFrame(animate);

    figures.forEach(({ figure, physics }) => {
      // Оновлення позиції фігури в сцені
      figure.position.copy(physics.position);
      figure.quaternion.copy(physics.quaternion);
    });
    personGroup.position.copy(personBody.position);
    stats.update();
    movePerson();
    
    world.step(Math.min(timeStep, 0.1));

    renderer.render(scene, camera);
  };

  animate(); // Запуск анімації
};
