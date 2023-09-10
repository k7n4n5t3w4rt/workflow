// @flow
//------------------------------------------------------------------
// FUNCTION: setMetricsDProps
//------------------------------------------------------------------
export const setMetricsDProps = (
  stpMetrics /*: StpMetrics */,
  metrics /*: Array<{key:string,value:string}>*/,
  flwMapIndex /*: number */,
) /*: StpMetrics */ => {
  // Set the name to the uuid so we can find it later - Three.js "needs" a name property
  stpMetrics.name = stpMetrics.uuid;
  stpMetrics.dStpIndex = flwMapIndex;
  for (const metric /*: { key:string, value:string } */ of metrics) {
    stpMetrics[metric.key] = metric.value;
  }
  return stpMetrics;
};
export default setMetricsDProps;
