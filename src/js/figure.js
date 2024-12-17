import * as THREE from "three";
import * as CANNON from "cannon-es";

const shapeColors = {
  O: new THREE.Color(0xffcc00), // Жовтий
  I: new THREE.Color(0x00ccff), // Блакитний
  S: new THREE.Color(0x00ff00), // Зелений
  Z: new THREE.Color(0xff0000), // Червоний
  L: new THREE.Color(0xff6600), // Помаранчевий
  J: new THREE.Color(0x6600cc), // Фіолетовий
  T: new THREE.Color(0x9900cc), // Пурпурний
};
export const createFigure = (type) => {
  const size = 0.5;
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({
    color: shapeColors[type],
    metalness: 0.8, // Висока металевість для блиску
    roughness: 0.4,
  });

  const group = new THREE.Group();
  group.position.y = 10
  const position = getFigurePosition(type, size);
  position.forEach(([x, y]) => {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x030303, // Колір граней (чорний)
      linewidth: 3, // Товщина лінії
    });
    const edgeLines = new THREE.LineSegments(edges, edgeMaterial); // Додаємо краї до куба
    cube.add(edgeLines); // Додаємо краї до кожного куба
    group.add(cube);
  });

  return group;
};
export const getFigurePosition = (type, size) => {
  switch (type) {
    case "I":
      return [
        [0, 0],
        [0, size],
        [0, 2 * size],
        [0, 3 * size],
      ];
    case "O":
      return [
        [0, 0],
        [size, 0],
        [0, size],
        [size, size],
      ];
    case "S":
      return [
        [0, 0],
        [size, 0],
        [size, size],
        [2 * size, size],
      ];
    case "Z":
      return [
        [0, 0],
        [-size, 0],
        [-size, size],
        [-2 * size, size],
      ];
    case "L":
      return [
        [0, 0],
        [0, size],
        [size, 0],
        [0, 2 * size],
      ];
    case "J":
      return [
        [0, 0],
        [0, size],
        [-size, 0],
        [0, 2 * size],
      ];
    case "T":
      return [
        [0, 0],
        [0, size],
        [size, size],
        [-size, size],
      ];
  }
};
