// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { should, test } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../js/flwAttrctr/actions/gSttngs.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "../js/flwattrctr/actions/globalSettings.js";
import globalState from "../js/flwattrctr/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import { generateTrainingData } from "../js/flwAttrctr/actions/generateTrainingData.js";

//------------------------------------------------------------------
// TEST: generateTrainingData
//------------------------------------------------------------------
test("------- generateTrainingData.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: void */ => {
  globalSettings();
  // So there are 2 touch steps
  gSttngs().set("steps", [
    {
      name: "Open",
      status: "backlog",
      limit: 0,
      movingLimit: 0,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "Ready",
      status: "wait",
      limit: 3,
      movingLimit: 3,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "Doing",
      status: "touch",
      limit: 3,
      movingLimit: 3,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "Ready for Test",
      status: "wait",
      limit: 3,
      movingLimit: 3,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "In Test",
      status: "touch",
      limit: 3,
      movingLimit: 3,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
    {
      name: "Done",
      status: "done",
      limit: 0,
      movingLimit: 0,
      avAge: 0,
      devUnits: 0,
      flwTimeAtStart: 0,
      actualFlwTime: 0,
      movingDevUnits: 0,
    },
  ]);
  gSttngs().set("timeBox", 10);
  globalState();
};

//------------------------------------------------------------------
// STUBS
//------------------------------------------------------------------
// Define a range of devPowerFix values to test
const devPowerFixValues = [
  0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5,
  1.6, 1.7, 1.8, 1.9, 2.0,
];
const headlessClickLoop = (
  nmbrOfTmbxLoops /*: number */,
  devPowerFixLocal /*: number */,
  flwTms /*: Array<number> */,
) /*: Array<number> */ => {
  // Simulate the click actions and flow times
  for (let i = 0; i < nmbrOfTmbxLoops; i++) {
    // Simulate a flow time based on the devPowerFix
    const simulatedFlwTime = Math.random() * 10 * devPowerFixLocal;
    flwTms.push(simulatedFlwTime);
  }
  return flwTms;
};
const populateStepsHeadless = () /*: void */ => {};

//------------------------------------------------------------------
// TEST: generateTrainingData()
//------------------------------------------------------------------
test("generateTrainingData() returns inputs and labels", async () => {
  fixture();

  const data = generateTrainingData(
    populateStepsHeadless,
    headlessClickLoop,
  )(devPowerFixValues);

  // 1. Check that both inner arrays are, in fact, arrays
  should(Array.isArray(data.inputs)).be.true();
  should(Array.isArray(data.labels)).be.true();

  // 2. Check that both inner arrays have a non-zero length
  should(data.inputs.length).be.greaterThan(0);
  should(data.labels.length).be.greaterThan(0);

  // 3. Check that every element in both arrays is a number
  should(data.inputs.every((i) => typeof i === "number")).be.true();
  should(data.labels.every((l) => typeof l === "number")).be.true();
});
