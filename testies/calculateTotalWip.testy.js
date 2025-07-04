// @flow
import { test } from "../server/testy.js";
import should from "should";
import gSttngs from "../js/flwAttrctr/actions/gSttngs.js";
import gState from "../js/flwAttrctr/actions/gState.js";
import calculateTotalWip from "../js/flwAttrctr/actions/calculateTotalWip.js";

test("------- calculateTotalWip.js -------", () => {
  should.exist(calculateTotalWip);
});

test("should return the total wip", () => {
    gSttngs().set("steps", [
      { name: "Open", status: "backlog", limit: 0 },
      { name: "Ready", status: "wait", limit: 3 },
      { name: "Doing", status: "touch", limit: 3 },
      { name: "Ready for Test", status: "wait", limit: 3 },
      { name: "In Test", status: "touch", limit: 3 },
      { name: "Done", status: "done", limit: 0 },
    ]);
    gState().set("flwMap", {
      "0": [],
      "1": [{}, {}],
      "2": [{}, {}, {}],
      "3": [{}],
      "4": [{}, {}],
      "5": [],
    });
    calculateTotalWip().should.equal(8);
});
