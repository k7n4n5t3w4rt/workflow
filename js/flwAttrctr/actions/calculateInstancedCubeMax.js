// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
//------------------------------------------------------------------
// calculateInstancedCubeMax()
//------------------------------------------------------------------
export const calculateInstancedCubeMax = () /*: number */ => {
  return gSttngs()
    .get("steps")
    .reduce(
      (_ /*: number */, flwStep /*: FlwStep */) /*: number */ => {
        if (flwStep.status === "done") {
          return _;
        }
        if (flwStep.limit > 0) {
          // Let's allow for double the limit in case the movingLimit
          // is set to more
          return (_ += flwStep.limit * 2);
        } else {
          // For each step that doesn't have a limit, we'll add 1000
          return (_ += 1000);
        }
      },
      0,
    );
};
export default calculateInstancedCubeMax;
