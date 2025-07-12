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

test("generateTrainingData() returns two arrays of numbers", async () => {
  fixture();
  const data = generateTrainingData();

  // 1. Check that the top-level return value is an array
  should(Array.isArray(data)).be.true();
  // 2. Check that it contains exactly two inner arrays
  should(data.length).be.exactly(2);

  const inputs = data[0];
  const labels = data[1];

  // 3. Check that both inner arrays are, in fact, arrays
  should(Array.isArray(inputs)).be.true();
  should(Array.isArray(labels)).be.true();

  // 4. Check that both inner arrays have a non-zero length
  should(inputs.length).be.greaterThan(0);
  should(labels.length).be.greaterThan(0);

  // 5. Check that every element in both arrays is a number
  should(inputs.every((i) => typeof i === "number")).be.true();
  should(labels.every((l) => typeof l === "number")).be.true();
});
