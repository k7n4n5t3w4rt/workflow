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
import newClickCube from "../js/workflow/actions/newClickCube.js";
import newFlwItem from "../js/workflow/actions/newFlwItem.js";
import getFlwMpSteps from "../js/workflow/actions/getFlwMpSteps.js";
//------------------------------------------------------------------
// IMPORT: FUNCTION UNDER TEST
//------------------------------------------------------------------
import setExpedite from "../js/workflow/actions/setExpedite.js";
//------------------------------------------------------------------
// TEST: setExpedite()
//------------------------------------------------------------------
test("-------------- setExpedite.js ---------------------", () /*: void */ => {
  should(1).be.exactly(1);
});

const fixture = () /*: Array<FlwItem> */ => {
  globalSettings();
  globalState();
  gState().set("clckCbGroup", newClickCube());
  const flwItems = [];
  flwItems.push(newFlwItem());
  flwItems.push(newFlwItem());
  flwItems.push(newFlwItem());
  flwItems.push(newFlwItem());
  return flwItems;
};

test("The dExpedite property is false by default.", () /*: void */ => {
  const flwItems = fixture();
  flwItems.forEach((flwItem /*: FlwItem */) => {
    // Should be false by default
    should(flwItem.dExpedite).be.false();
  });
});

test("The dExpedite property is properly set up to the limit.", () /*: void */ => {
  fixture();
  gSttngs().set("expdtLimit", 3);
  gState().set("expdtCount", 0);
  let localCounter = 0;
  setExpedite();
  const flwMpSteps = getFlwMpSteps();
  flwMpSteps.forEach((flwMpStpItems /*: FlwItem[] */) => {
    const flwMpStpItmsCopy = [...flwMpStpItems];
    // NOT reversed, so the first flwItem is NOT expedited
    flwMpStpItmsCopy.forEach((flwItem /*: FlwItem */) => {
      if (++localCounter === 1) {
        should(flwItem.dExpedite).be.false();
      } else {
        should(flwItem.dExpedite).be.true();
      }
    });
  });
});

test("Calling setExpedite() twice respects the expediteLimit.", () /*: void */ => {
  fixture();
  gSttngs().set("expdtLimit", 3);
  gState().set("expdtCount", 0);
  let localCounter = 0;
  setExpedite();
  const flwMpSteps = getFlwMpSteps();
  flwMpSteps.forEach((flwMpStpItems /*: FlwItem[] */) => {
    const flwMpStpItmsCopy = [...flwMpStpItems];
    // NOT reversed, so the first flwItem is NOT expedited
    flwMpStpItmsCopy.forEach((flwItem /*: FlwItem */) => {
      if (++localCounter === 1) {
        should(flwItem.dExpedite).be.false();
      } else {
        should(flwItem.dExpedite).be.true();
      }
    });
  });
});
