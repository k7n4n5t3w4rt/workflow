// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "./gSttngs.js";
import gState from "./gState.js";
import setUpFlwMap from "./setUpFlwMap.js";

export default () => {
  gState().setSid("workflowState");
  //------------------------------------------------------------------
  // Empty objects and sensible defaults
  //------------------------------------------------------------------
  gState().set("clckCbGroup", {});
  gState().set("clckCube", {});
  gState().set("clicks", 0);
  gState().set("drag", 0);
  gState().set("endPosition", {});
  gState().set("expdtCount", gSttngs().get("expdtQueueLength"));
  gState().set("flwItems", []);
  gState().set("flwItmTracker", {});
  gState().set("flwMap", {});
  gState().set("flwItmsPulledCount", 0);
  gState().set("scnData", {});
  gState().set("strtPosition", {});
  gState().set("vSphere", {});
  //------------------------------------------------------------------
  // Generated values:
  //------------------------------------------------------------------
  gState().set("vQueue", new xQueue());
  gState().set("flwTmQueue", new xQueue());
  gState().set("thrPtQueue", new xQueue());
  gState().set("wipQueue", new xQueue());
  gState().set("flwTmExpQueue", new xQueue());
  gState().set("thrPtExpQueue", new xQueue());
  gState().set("wipExpdtQueue", new xQueue());
  setUpFlwMap(gState().get("flwMap"), gSttngs().get("steps"));
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
    return Math.round(total * 100) / 100;
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

  this.dailyMean = () /*: number */ => {
    if (this.length() === 0) return 0;
    let total = 0;
    let count = 0;
    for (const index in this.items) {
      count += 1;
      total += this.items[index].reduce(
        (_ /*: number */, value /*: number */) /*: number */ => {
          if (value > 0) {
            return _ + value;
          }
          return _;
        },
        0,
      );
    }
    // 0/0 = NaN
    if (count === 0) return 0;
    const mean = total / count;
    return Math.round(mean * 100) / 100;
  };

  this.flwItemMean = () /*: number */ => {
    if (this.length() === 0) return 0;
    let total = 0;
    let count = 0;
    for (const index in this.items) {
      total += this.items[index].reduce(
        (_ /*: number */, value /*: number */) /*: number */ => {
          count += 1;
          if (value > 0) {
            return _ + value;
          }
          return _;
        },
        0,
      );
    }
    // 0/0 = NaN
    if (count === 0) return 0;
    const mean = total / count;
    return Math.round(mean * 100) / 100;
  };

  this.length = () /*: number */ => {
    return this.tailIndex - this.headIndex;
  };
}
