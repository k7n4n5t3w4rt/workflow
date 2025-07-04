// @flow
import { test, should } from "../server/testy.js";
import gSttngs from "../js/flwAttrctr/actions/gSttngs.js";
import gState from "../js/flwAttrctr/actions/gState.js";
import calculateTotalWip from "../js/flwAttrctr/actions/calculateTotalWip.js";

test("------- calculateTotalWip.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

test("should return the total wip", () /*: void */ => {
    gSttngs().set("steps", [
      { name: "Open", status: "backlog", limit: 0, movingLimit: 0, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
      { name: "Ready", status: "wait", limit: 3, movingLimit: 3, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
      { name: "Doing", status: "touch", limit: 3, movingLimit: 3, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
      { name: "Ready for Test", status: "wait", limit: 3, movingLimit: 3, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
      { name: "In Test", status: "touch", limit: 3, movingLimit: 3, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
      { name: "Done", status: "done", limit: 0, movingLimit: 0, avAge: 0, devUnits: 0, flwTimeAtStart: 0, actualFlwTime: 0, movingDevUnits: 0 },
    ]);
    gState().set("flwMap", {
      "0": [],
      "1": [{}, {}],
      "2": [{}, {}, {}],
      "3": [{}],
      "4": [{}, {}],
      "5": [],
    });
    should(calculateTotalWip()).equal(8);
});
