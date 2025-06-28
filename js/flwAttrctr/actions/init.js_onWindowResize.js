// @flow

export default (
  camera /*: ThrCamera */,
  renderer /*: ThrRenderer */,
  labelRenderer /*: ThrLabelRenderer */,
  window /*: DomWindow */,
) /*: () => void */ => {
  return () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
  };
};
