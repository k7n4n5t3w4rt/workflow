// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../../../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "./globalSettings.js";
import globalState from "./globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import newFlwItem from "./newFlwItem.js";
import newClickCube from "./newClickCube.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import makeItOneClickOlder from "./makeItOneClickOlder.js";
//------------------------------------------------------------------
// TEST: makeItOneClickOlder()
//------------------------------------------------------------------
test("------- makeItOneClickOlder.js -------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: FlwItem */ => {
  globalSettings();
  globalState();
  gState().set("clckCbGroup", newClickCube());
  return newFlwItem();
};

test("Returns a flwItem with the updated dBacklogAge.", () /*: void */ => {
  const flwItem = fixture();
  // It will be this by default, unless it isn't...
  flwItem.dStpIndex = 0;
  const newFlwItmRef = makeItOneClickOlder(flwItem);
  should(newFlwItmRef.dBacklogAge).be.exactly(1);
  const anotherNewFlwItmRef = makeItOneClickOlder(newFlwItmRef);
  should(anotherNewFlwItmRef.dBacklogAge).be.exactly(2);
});

test("Returns a flwItem with the updated dAge.", () /*: void */ => {
  const flwItem = fixture();
  flwItem.dStpIndex = 1;
  const newFlwItmRef = makeItOneClickOlder(flwItem);
  should(newFlwItmRef.dAge).be.exactly(1);
  const anotherNewFlwItmRef = makeItOneClickOlder(newFlwItmRef);
  should(anotherNewFlwItmRef.dAge).be.exactly(2);
});

test("Returns a flwItem with new opacity when death is 10.", () /*: void */ => {
  const flwItem = fixture();
  flwItem.dStpIndex = 1;
  gSttngs().set("death", 10);
  const newFlwItmRef = makeItOneClickOlder(flwItem);
  should(newFlwItmRef.material.opacity).be.exactly(0.9);
  const anotherNewFlwItmRef = makeItOneClickOlder(newFlwItmRef);
  should(anotherNewFlwItmRef.material.opacity).be.exactly(0.8);
});

test("Returns a flwItem with opacity unchanged when death is 0.", () /*: void */ => {
  const flwItem = fixture();
  flwItem.dStpIndex = 1;
  gSttngs().set("death", 0);
  const newFlwItmRef = makeItOneClickOlder(flwItem);
  should(newFlwItmRef.material.opacity).be.exactly(1);
});
