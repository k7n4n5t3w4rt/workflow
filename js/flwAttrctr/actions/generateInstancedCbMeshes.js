// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORTS: THREE.js
//------------------------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
//import readEasyStore from "./readEasyStore.js";
import readLocalStore from "./readLocalStore.js";
import easyStorage from "./easyStorage.js";
import isParsable from "./isParsable.js";
import calculateInstancedCubeMax from "./calculateInstancedCubeMax.js";
//------------------------------------------------------------------
// generateInstancedCbMeshes()
//------------------------------------------------------------------
const generateInstancedCbMeshes = () /*: ThrInstancedMeshType */ => {
  //------------------------------------------------------------------
  // Create the geometry
  //------------------------------------------------------------------
  const x = gSttngs().get("x");
  const y = gSttngs().get("y");
  const z = gSttngs().get("z");
  const geometry = new THREE.BoxBufferGeometry(x, y, z);

  //------------------------------------------------------------------
  // Set the material
  //------------------------------------------------------------------
  const color /*: string */ = gSttngs().get("colorGrey");
  const colorCode = "#" + color;
  const material = new THREE.MeshLambertMaterial({
    color: colorCode,
    transparent: true,
  });

  //------------------------------------------------------------------
  // Create the InstancedMesh
  //------------------------------------------------------------------
  let instancedCbMax = gSttngs().get("instancedCbMax");
  const instncdCbMesh = new THREE.InstancedMesh(
    geometry,
    material,
    instancedCbMax,
  );
  instncdCbMesh.castShadow = true;
  instncdCbMesh.receiveShadow = true;
  instncdCbMesh.material.opacity = 0.9;

  //------------------------------------------------------------------
  // Set the position
  //------------------------------------------------------------------
  const strtPosition = gState().get("strtPosition");
  instncdCbMesh.position.set(strtPosition.x, strtPosition.y, strtPosition.z);

  //------------------------------------------------------------------
  // Hide all the instances
  //------------------------------------------------------------------
  const matrix = new THREE.Matrix4().scale(new THREE.Vector3(4, 4, 4));
  for (let i = 0; i < instancedCbMax; i++) {
    instncdCbMesh.setMatrixAt(i, matrix);
  }
  instncdCbMesh.instanceMatrix.needsUpdate = true;

  //------------------------------------------------------------------
  // Add the InstancedMesh to the scene
  //------------------------------------------------------------------
  const clckCbGroup = gState().get("clckCbGroup");
  clckCbGroup.add(instncdCbMesh);
  gState().set("instncdCbMesh", instncdCbMesh);

  return instncdCbMesh;
};
export default generateInstancedCbMeshes;
