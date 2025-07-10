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
import { headlessClickLoop } from "../js/flwAttrctr/actions/click.js";

const fixture = () /*: void */ => {
  globalSettings();
  globalState();
};

test("generateData()", async () => {
  fixture();
  const data = await headlessClickLoop();
  should(Array.isArray(data)).be.true();
  should(data.length).be.greaterThan(0);
});
