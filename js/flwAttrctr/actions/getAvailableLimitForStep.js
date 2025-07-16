// @flow
//------------------------------------------------------------------
// getAvailableLimitForStep()
//------------------------------------------------------------------

export default (
  flwStpLimit /*: number */,
  flwMpStpItems /*: FlwItem[] */,
) /*: "no limit" | number */ => {
  // Check that the number of flwItems in this step is less than
  // the limit. Note that a limit of 0 means no limit, and we
  // start by assuming that `flwStpLimit` is 0.
  let availableLimit /*: "no limit" | 0 | number */ = "no limit";
  // `flwStpLimit` may be an actual limit
  if (flwStpLimit > 0) {
    // console\.log\(
    //   `getAvailableLimitForStep(): Checking available limit for step with limit ${flwStpLimit} and ${flwMpStpItems.length} items`,
    // \);
    availableLimit = flwStpLimit - flwMpStpItems.length;
    // console\.log\(
    //   `getAvailableLimitForStep(): Available limit for step with limit ${flwStpLimit} is ${availableLimit}`,
    // \);
  }
  // Account for the (hopefully rare) case where the limit is
  // exceeded - like if there's is one or more expedited items
  if (availableLimit !== "no limit" && availableLimit < 0) {
    availableLimit = 0;
    // console\.log\(
    //   `getAvailableLimitForStep(): Available limit is negative, setting to 0 for step with limit ${flwStpLimit} and ${flwMpStpItems.length} items`,
    // \);
  }
  return availableLimit;
};
