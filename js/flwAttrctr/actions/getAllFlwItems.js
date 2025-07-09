//------------------------------------------------------------------
// IMPORT: HELPERS
//------------------------------------------------------------------
import getFlwMpSteps from "./getFlwMpSteps";
//------------------------------------------------------------------
// getAllFlwItems()
//------------------------------------------------------------------
export default () => {
  const flwItems /*: FlwItem[] */ = [];
  getFlwMpSteps().forEach((flwMpStep /*: FlwItem[] */) => {
    flwMpStep.forEach((flwItem /*: FlwItem */) => {
      flwItems.push(flwItem);
    });
  });
  return flwItems;
};
