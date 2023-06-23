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
  gState("flwItmsPulledCount", 0);
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

  this.enqueue = (item /*: any */) /*: void */ => {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  };

  this.dequeue = () /*: Array<number> */ => {
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  };

  this.total = () /*: number */ => {
    let total = 0;
    for (const index in this.items) {
      total += this.items[index].reduce(
        (_ /*: number */, item /*: number */) /*: number */ => _ + item,
        0,
      );
    }
    return Math.round(total * 10000) / 10000;
  };

  // this._85th = () /*: number */ => {
  //   const numbers = [];
  //   for (const index in this.items) {
  //     numbers.push(this.items[index]);
  //   }
  //   if (numbers.length === 0) return 0;
  //   numbers.sort((a, b) => a - b);
  //   let index = Math.ceil((85 / 100) * numbers.length);
  //   return numbers[index - 1];
  // };

  this.mean = () /*: number */ => {
    if (this.length() === 0) return 0;
    let total = 0;
    let count = 0;
    for (const index in this.items) {
      total += this.items[index].reduce(
        (_ /*: number */, item /*: number */) /*: number */ => {
          count += 1;
          return _ + item;
        },
        0,
      );
    }
    const mean = total / count;
    return Math.round(mean * 100) / 100;
  };

  this.length = () /*: number */ => {
    return this.tailIndex - this.headIndex;
  };
}
