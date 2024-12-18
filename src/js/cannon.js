import * as CANNON from "cannon-es";

import { getFigurePosition } from "./figure";

export const createPhysicsWorld = () => {
  const world = new CANNON.World();
  world.gravity.set(0, -5, 0); // Гравітація

  const concreteMaterial = new CANNON.Material("concrete");
  const plastycMaterial = new CANNON.Material("plastyc");
  const contactMaterial = new CANNON.ContactMaterial(
    plastycMaterial,
    concreteMaterial,
    {
      friction: 0.7,
      restitution: 0.7,
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

const personBody = new CANNON.Body({
  type: CANNON.Body,
  shape: new CANNON.Box(new CANNON.Vec3(0.5, 1.5, 0.5)),
  material: concreteMaterial,
});
personBody.position.set(0,1.5,0)
world.addBody(personBody)
  
  const addPhysicsToFigure = (type) => {
    const size = 1;
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


  return { world, addPhysicsToFigure,personBody };
};
