// import * as THREE from "three";
// import { createFigure } from "./figure";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";
// export const createScene = () => {
//   const scene = new THREE.Scene();
//   const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(30, 30),
//     new THREE.MeshBasicMaterial({ color: "#fff" })
//   );
//   plane.rotation.x = -Math.PI / 2;
//   scene.add(plane);
//   const gridBottom = new THREE.GridHelper(40, 40);
//   // scene.add(gridBottom);


//   const personGroup = new THREE.Group();
//   const player = new THREE.Mesh(
//     new THREE.BoxGeometry(1,3,1),
//     new THREE.MeshBasicMaterial({ color: "#1E1D1D", wireframe: true })
//   );
//   personGroup.add(player);
  
//   const gltfLoader = new GLTFLoader();
//   let mixer;
//   gltfLoader.load(
//     "/venom.glb",
//     (gltf) => {
//       scene.add(gltf.scene);
//       gltf.scene.position.set(0,-1.6,0)
//       mixer = new THREE.AnimationMixer(gltf.scene)
//       const action = mixer.clipAction(gltf.animations[2])
//       action.play()
//       personGroup.add(gltf.scene);
//       const anim = ()=>{
//         requestAnimationFrame(anim)
//         mixer.update(0.01)
//       }
//       anim()
//     },
//     (xhr) => {
//       const progress = (xhr.loaded / xhr.total) * 100;
//       console.log(`Model loading: ${Math.round(progress)}% completed`);
//     },
//     (error) => {
//       // Error callback: Handle loading errors
//       console.error("An error occurred while loading the model:", error);
//     }
//   );
//   personGroup.position.set(0, 1.5, 5);
//   personGroup.rotation.set(0,3,0)
// scene.add(personGroup)
//   // light
//   const ambientLight = new THREE.AmbientLight("#fff", 1);

//   scene.add(ambientLight);
//   // const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Колір і інтенсивність
//   // directionalLight.position.set(0, 0, 5); // Напрямок світла
//   // scene.add(directionalLight);
//   return { scene,personGroup };
// };
