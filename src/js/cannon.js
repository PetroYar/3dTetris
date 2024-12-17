import * as CANNON from "cannon-es";

import { getFigurePosition } from "./figure";

export const createPhysicsWorld = () => {
  const world = new CANNON.World();
  world.gravity.set(0, -2, 0); // Гравітація

  const concreteMaterial = new CANNON.Material("concrete");
  const plastycMaterial = new CANNON.Material("plastyc");
  const contactMaterial = new CANNON.ContactMaterial(
    plastycMaterial,
    concreteMaterial,
    {
      friction: 0,
      restitution: 1,
    }
  );

  world.addContactMaterial(contactMaterial);

  const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
    material: concreteMaterial,
  });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(groundBody);

  
  const addPhysicsToFigure = (type) => {
    const size = 0.5;
    const body = new CANNON.Body({ mass: 1,material:plastycMaterial});
    const position = getFigurePosition(type, size);
    position.forEach(([x, y]) => {
      const shape = new CANNON.Box(
        new CANNON.Vec3(size / 2, size / 2, size / 2)
      );
      const localPosition = new CANNON.Vec3(x, y, 0);
      body.addShape(shape, localPosition);
    });
    body.position.set(0, 10, 0);
    world.addBody(body);
    return body;
  };


  return { world, addPhysicsToFigure };
};
