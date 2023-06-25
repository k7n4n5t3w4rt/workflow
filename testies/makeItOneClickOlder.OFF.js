// @flow
//------------------------------------------------------------------
// IMPORT: TESTY
//------------------------------------------------------------------
import { test, testPromise, should } from "../server/testy.js";
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../js/workflow/actions/gSttngs.js";
import gState from "../js/workflow/actions/gState.js";
//------------------------------------------------------------------
// IMPORT: SETTINGS/STATE
//------------------------------------------------------------------
import globalSettings from "../js/workflow/actions/globalSettings.js";
import globalState from "../js/workflow/actions/globalState.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import newFlwItem from "../js/workflow/actions/newFlwItem.js";
import newClickCube from "../js/workflow/actions/newClickCube.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import makeItOneClickOlder from "../js/workflow/actions/makeItOneClickOlder.js";
//------------------------------------------------------------------
// TEST: makeItOneClickOlder()
//------------------------------------------------------------------
test("-------------- makeItOneClickOlder.js ---------------------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: FlwItem */ => {
  globalSettings({});
  globalState();
  gState().set("clckCbGroup", newClickCube());
  return newFlwItem();
};

test("Returns a flwItem with the updated dAge.", () /*: void */ => {
  const flwItem = fixture();
  const newFlwItmRef = makeItOneClickOlder(flwItem);
  should(newFlwItmRef.dAge).be.exactly(1);
  const anotherNewFlwItmRef = makeItOneClickOlder(newFlwItmRef);
  should(anotherNewFlwItmRef.dAge).be.exactly(2);
});

test("Returns a flwItem with new opacity when death is 10.", () /*: void */ => {
  const flwItem = fixture();
  gSttngs().set("death", 10);
  const newFlwItmRef = makeItOneClickOlder(flwItem);
  should(newFlwItmRef.material.opacity).be.exactly(0.9);
  const anotherNewFlwItmRef = makeItOneClickOlder(newFlwItmRef);
  should(anotherNewFlwItmRef.material.opacity).be.exactly(0.8);
});

test("Returns a flwItem with opacity unchanged when death is 0.", () /*: void */ => {
  const flwItem = fixture();
  gSttngs().set("death", 0);
  const newFlwItmRef = makeItOneClickOlder(flwItem);
  should(newFlwItmRef.material.opacity).be.exactly(1);
});
