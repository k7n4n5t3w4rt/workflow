// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import render from "./render.js";

export default (
  sceneData /*: SceneData */,
  xCm /*: number */,
  yCm /*: number */,
  zCm /*: number */,
) /*: SceneData  */ => {
  const { stats, scene, camera, renderer, reticleStuff, cubes } = sceneData;
  // const { stats, scene, camera, renderer, reticleStuff } = sceneData;

  sceneData.renderer.setAnimationLoop(render(sceneData, xCm, yCm, zCm));
  return { stats, scene, camera, renderer, reticleStuff, cubes };
};
