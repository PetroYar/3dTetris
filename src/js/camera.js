import * as THREE from "three";

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  
  camera.position.set(0, 1, 15);

  return camera;
};
