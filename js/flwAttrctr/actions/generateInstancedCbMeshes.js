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
  // Create the geometry. I'm assuming you're using a BoxBufferGeometry for cubes.
  const x = gSttngs().get("x");
  const y = gSttngs().get("y");
  const z = gSttngs().get("z");
  const geometry = new THREE.BoxBufferGeometry(x, y, z); // Adjust size as needed

  // Create a color for each vertex of the geometry.
  // In this case, we'll set them all to white.
  const numVertices = geometry.attributes.position.count;
  const colors = new Float32Array(numVertices * 3); // each vertex needs 3 float values for r, g, b

  for (let i = 0; i < numVertices; i++) {
    colors[i * 3] = 1; // red
    colors[i * 3 + 1] = 1; // green
    colors[i * 3 + 2] = 1; // blue
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Get the color from your settings
  const color /*: string */ = gSttngs().get("colorGrey");
  const colorCode = "#" + color;
  const material = new THREE.MeshLambertMaterial({
    color: colorCode,
    // this tells the material to use vertex colors
    vertexColors: THREE.VertexColors,
  });

  // Get the max instances from your settings
  const instancedCbMax /*: number */ = gSttngs().get("instancedCbMax");

  // Create the InstancedMesh
  const instncdCbMesh /*: ThrInstancedMeshType */ = new THREE.InstancedMesh(
    geometry,
    material,
    instancedCbMax,
  );
  // Hide all the instances
  const matrix = new THREE.Matrix4().scale(new THREE.Vector3(0, 0, 0));
  for (let i = 0; i < instancedCbMax; i++) {
    instncdCbMesh.setMatrixAt(i, matrix);
  }
  instncdCbMesh.instanceMatrix.needsUpdate = true;
  const clckCbGroup = gState().get("clckCbGroup");
  clckCbGroup.add(instncdCbMesh);
  // Set the state
  gState().set("instncdCbMesh", instncdCbMesh);
  return instncdCbMesh;
};
export default generateInstancedCbMeshes;
