// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
//------------------------------------------------------------------
// TESTY
//------------------------------------------------------------------
// import { test, testPromise, should } from "../server/testy";
//------------------------------------------------------------------
// calculateEndPositionZ()
//------------------------------------------------------------------
export const calculateEndPositionZ = () /*: number */ => {
  return (
    gState().get("strtPosition").z -
    gSttngs().get("step") * (gSttngs().get("steps").length * 0.8)
  );
};
export default calculateEndPositionZ;
//------------------------------------------------------------------
// TESTS
//------------------------------------------------------------------
// const fixture = () => {
//   gState().setNoCache("strtPosition", { x: 0, y: 0, z: 0 });
//   gSttngs().setNoCache("step", 10);
//   gSttngs().set("steps", [{}, {}, {}]);
// };
// test("calculateEndPositionZ()", () => {
//   fixture();
//   const endPositionZ = calculateEndPositionZ();
//   should(endPositionZ).equal(-45);
// });
