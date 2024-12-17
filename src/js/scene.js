import * as THREE from "three";
import { createFigure } from "./figure";

export const createScene = (figure) => {
  const scene = new THREE.Scene();
  const fieldWidth = 10;
  const fieldHeight = 20;
  const blockSize = 1;

  const planeGeometry = new THREE.PlaneGeometry(
    fieldWidth * blockSize,
    fieldHeight * blockSize
  );
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xeeeeee,
    side: THREE.DoubleSide,
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = Math.PI / 2;
  scene.add(plane);

  // figure.forEach((element) => {
  //   scene.add(element.figure);
  // });

  // light
  const ambientLight = new THREE.AmbientLight("#fff", 1);

  scene.add(ambientLight);
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Колір і інтенсивність
  // directionalLight.position.set(0, 0, 5); // Напрямок світла
  // scene.add(directionalLight);
  return { scene };
};
