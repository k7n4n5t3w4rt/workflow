//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps.js";
//------------------------------------------------------------------
// getAllFlwItems()
//------------------------------------------------------------------
export const getAllFlwItems = () /*: CbInstance[] */ => {
  const flwItems /*: CbInstance[] */ = [];
  getFlwMpSteps().forEach((flwMpStep /*: CbInstance[] */) => {
    flwMpStep.forEach((flwItem /*: CbInstance */) => {
      flwItems.push(flwItem);
    });
  });
  return flwItems;
};
export default getAllFlwItems;
