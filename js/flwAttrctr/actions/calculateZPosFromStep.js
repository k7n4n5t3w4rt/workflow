// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs";
import gState from "./gState";
// import globalSettings from "./globalSettings";
// import globalstate from "./globalstate";
//------------------------------------------------------------------
// TESTY
//------------------------------------------------------------------
// import { test, testPromise, should } from "../server/testy";
//------------------------------------------------------------------
// calculateZPosFromStep()
//------------------------------------------------------------------
export const calculateZPosFromStep = (
  flwMapIndex /*: number */,
) /*: number */ => {
  return gState().get("strtPosition").z - gSttngs().get("step") * flwMapIndex;
};
export default calculateZPosFromStep;
//------------------------------------------------------------------
// TESTS
//------------------------------------------------------------------
// const fixture = () => {
//   gState().setNoCache("strtPosition", { x: 0, y: 0, z: 0 });
//   gSttngs().setNoCache("step", 10);
// };
// test("calculateZPosFromStep()", () => {
//   fixture();
//   const position1 = calculateZPosFromStep(1);
//   const position2 = calculateZPosFromStep(2);
//   should(position1).equal(-10);
//   should(position2).equal(-20);
// });
