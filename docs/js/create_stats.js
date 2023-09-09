// @flow
//------------------------------------------------------------------------------
// HELPERS
//------------------------------------------------------------------------------
import Stats from "./vendor/stats.module.js";
//------------------------------------------------------------------------------
// FUNCTION: createStats
//------------------------------------------------------------------------------
export const createStats = () /*: Object */ => {
  const stats = new Stats();
  stats.setMode(0);

  // assign css to align it properly on the page
  stats.domElement.id = "stats";
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0";
  stats.domElement.style.top = "0";
  return stats;
};
export default createStats;
