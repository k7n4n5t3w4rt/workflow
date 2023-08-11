// @flow
//------------------------------------------------------------------
// FUNCTION: setStateFunctionsStore()
//------------------------------------------------------------------
export default (
  useState /*: (any) => [any,function] */,
) /*: [Object, Object] */ => {
  const setStateFunctions = {};
  const lState = {};
  //----------------------------------------
  // Boolean
  //----------------------------------------
  const [autoMode, setAutoMode] = useState(false);
  setStateFunctions["autoMode"] = setAutoMode;
  lState["autoMode"] = autoMode;
  const [easyStorage, setEasyStorage] = useState(false);
  setStateFunctions["easyStorage"] = setEasyStorage;
  lState["easyStorage"] = easyStorage;
  // Not implemented yet
  const [showMetrics, setShowMetrics] = useState(true);
  setStateFunctions["showMetrics"] = setShowMetrics;
  lState["showMetrics"] = showMetrics;
  const [debug, setDebug] = useState(false);
  setStateFunctions["debug"] = setDebug;
  lState["debug"] = debug;
  const [dfntnOfReady, setDfntnOfReady] = useState(false);
  setStateFunctions["dfntnOfReady"] = setDfntnOfReady;
  lState["dfntnOfReady"] = dfntnOfReady;
  //----------------------------------------
  // Sliders
  //----------------------------------------
  const [arrivalRate, setArrivalRate] = useState(0);
  setStateFunctions["arrivalRate"] = setArrivalRate;
  lState["arrivalRate"] = arrivalRate;
  const [avrgFlwTimeAtStart, setAvrgFlwTimeAtStart] = useState(1);
  setStateFunctions["avrgFlwTimeAtStart"] = setAvrgFlwTimeAtStart;
  lState["avrgFlwTimeAtStart"] = avrgFlwTimeAtStart;
  const [flwTimeMin, setFlwTimeMin] = useState(1);
  setStateFunctions["flwTimeMin"] = setFlwTimeMin;
  lState["flwTimeMin"] = flwTimeMin;
  const [flwTimeMax, setFlwTimeMax] = useState(1);
  setStateFunctions["flwTimeMax"] = setFlwTimeMax;
  lState["flwTimeMax"] = flwTimeMax;
  const [devUnits, setDevUnits] = useState(1);
  setStateFunctions["devUnits"] = setDevUnits;
  lState["devUnits"] = devUnits;
  const [devPowerFix, setDevPowerFix] = useState(1);
  setStateFunctions["devPowerFix"] = setDevPowerFix;
  lState["devPowerFix"] = devPowerFix;
  const [devPowerFactor, setDevPowerFactor] = useState(1);
  setStateFunctions["devPowerFactor"] = setDevPowerFactor;
  lState["devPowerFactor"] = devPowerFactor;
  const [drag, setDrag] = useState(1);
  setStateFunctions["drag"] = setDrag;
  lState["drag"] = drag;
  const [paretoPoint, setParetoPoint] = useState(0);
  setStateFunctions["paretoPoint"] = setParetoPoint;
  lState["paretoPoint"] = paretoPoint;
  const [numberOfSteps, setNumberOfSteps] = useState(4);
  setStateFunctions["numberOfSteps"] = setNumberOfSteps;
  lState["numberOfSteps"] = numberOfSteps;
  const [timeBox, setTimeBox] = useState(10);
  setStateFunctions["timeBox"] = setTimeBox;
  lState["timeBox"] = timeBox;
  const [death, setDeath] = useState(0);
  setStateFunctions["death"] = setDeath;
  lState["death"] = death;
  const [backlogDeath, setBacklogDeath] = useState(0);
  setStateFunctions["backlogDeath"] = setBacklogDeath;
  lState["backlogDeath"] = backlogDeath;
  const [flwItmSizeLimit, setFlwItmSizeFactor] = useState(1);
  setStateFunctions["flwItmSizeLimit"] = setFlwItmSizeFactor;
  lState["flwItmSizeLimit"] = flwItmSizeLimit;
  const [fps, setFps] = useState(1);
  setStateFunctions["fps"] = setFps;
  lState["fps"] = fps;
  const [expdtQueueLength, setExpdtQueueLength] = useState(0);
  setStateFunctions["expdtQueueLength"] = setExpdtQueueLength;
  lState["expdtQueueLength"] = expdtQueueLength;
  const [expdtDvUnitsFactor, setExpdtDvUnitsFactor] = useState(1);
  setStateFunctions["expdtDvUnitsFactor"] = setExpdtDvUnitsFactor;
  lState["expdtDvUnitsFactor"] = expdtDvUnitsFactor;
  const [scaleCm, setScaleCm] = useState(10);
  setStateFunctions["scaleCm"] = setScaleCm;
  lState["scaleCm"] = scaleCm;
  const [rangeMax, setRangeMax] = useState(1);
  setStateFunctions["rangeMax"] = setRangeMax;
  lState["rangeMax"] = rangeMax;
  const [rangeIncreaseRate, setRangeIncreaseRate] = useState(1);
  setStateFunctions["rangeIncreaseRate"] = setRangeIncreaseRate;
  lState["rangeIncreaseRate"] = rangeIncreaseRate;
  const [rangeMidpoint, setRangeMidpoint] = useState(1);
  setStateFunctions["rangeMidpoint"] = setRangeMidpoint;
  lState["rangeMidpoint"] = rangeMidpoint;
  // Not implemented yet
  const [specialisation, setSpecialisation] = useState(0);
  setStateFunctions["specialisation"] = setSpecialisation;
  lState["specialisation"] = specialisation;
  const [teamInstability, setTeamInstability] = useState(0);
  setStateFunctions["teamInstability"] = setTeamInstability;
  lState["teamInstability"] = teamInstability;
  return [lState, setStateFunctions];
};
