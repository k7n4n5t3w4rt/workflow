// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
//import readEasyStore from "./readEasyStore.js";
import readLocalStore from "./readLocalStore.js";
import easyStorage from "./easyStorage.js";
import isParsable from "./isParsable.js";
//------------------------------------------------------------------
// generateInctvCbInstancesDataArray()
//------------------------------------------------------------------
const generateInctvCbInstancesDataArray = () /*: Array<CbInstance> */ => {
  // A default of 0 just in case
  const instancedCbMax = gSttngs().get("instancedCbMax") || 0;
  const inctvCbInstancesDataArray = [];
  for (let i = 0; i < instancedCbMax; i++) {
    inctvCbInstancesDataArray.push({
      index: i,
      name: "cb_" + i.toString(),
      // -----------------------
      // Data:
      // -----------------------
      dAge: 0,
      dColor: "",
      dDysEachTouchStep: 0,
      dDysRmnngInTotal: 0,
      dDysRmnngThisStep: 0,
      dDysTotal: 0,
      dExpedite: false,
      dMoving: false,
      dPosition: { x: 0, y: 0, z: 0 },
      dScale: 0,
      dSkipForWip: false,
      dStepsAges: {},
      dStpIndex: 0,
      dTmNumber: 0,
      dValue: 0,
      dVolume: 0,
    });
  }
  return inctvCbInstancesDataArray;
};
export default generateInctvCbInstancesDataArray;
