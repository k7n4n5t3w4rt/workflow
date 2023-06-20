// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";

export default () => {
  //------------------------------------------------------------------
  // Empty objects and sensible defaults
  //------------------------------------------------------------------
  gState("clckCbGroup", {});
  gState("clckCube", {});
  gState("clicks", 0);
  gState("drag", 0);
  gState("endPosition", {});
  gState("expdtCount", gSttngs().expdtLimit);
  gState("flwItems", []);
  gState("flwItmTracker", {});
  gState("flwMap", {});
  gState("scnData", {});
  gState("strtPosition", {});
  gState("vSphere", {});
  //------------------------------------------------------------------
  // Generated values:
  //------------------------------------------------------------------
  gState("vQueue", new xQueue());
  gState("flwTmQueue", new xQueue());
  gState("thrPtQueue", new xQueue());
  gState("wipQueue", new xQueue());
  setUpFlwMap(gState().flwMap, gSttngs().steps);
};

//------------------------------------------------------------------
// setUpFlwMap(gFlwMap, gFlwSteps)
//------------------------------------------------------------------
const setUpFlwMap = (gFlwMap /*: FlwMap */, gFlwSteps /*: FlwStep[] */) => {
  // Set each stepTotal to 0
  gFlwSteps.forEach((step /*: FlwStep */, index /*: number */) => {
    gState().flwMap[index.toString()] = [];
  });
};

//------------------------------------------------------------------
// new vQueue()
//------------------------------------------------------------------
function xQueue() {
  this.items = {};
  this.headIndex = 0;
  this.tailIndex = 0;

  this.enqueue = (item /*: number */) => {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  };

  this.dequeue = () => {
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  };

  this.total = () => {
    let total = 0;
    for (const index in this.items) {
      total += this.items[index];
    }
    return Math.round(total * 10000) / 10000;
  };

  this._85th = () => {
    const numbers = [];
    for (const index in this.items) {
      numbers.push(this.items[index]);
    }
    if (numbers.length === 0) return 0;
    numbers.sort((a, b) => a - b);
    let index = Math.ceil((85 / 100) * numbers.length);
    return numbers[index - 1];
  };

  this.mean = () => {
    let total = 0;
    for (const index in this.items) {
      total += this.items[index];
    }
    if (this.length() === 0) return 0;
    const mean = total / this.length();
    return Math.round(mean * 100) / 100;
  };

  this.length = () => {
    return this.tailIndex - this.headIndex;
  };
}
