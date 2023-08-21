// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// FUNCTION: setStateFunctionsStore()
//------------------------------------------------------------------
export const setStateFunctionsStore = (
  useState /*: (any) => [any,function] */,
) /*: [Object, Object] */ => {
  const lState = {};
  const setStateFunctions = {};
  // Initialise the local state variables with default values
  const [arrivalRate, setArrivalRate] = useState(0);
  const [autoMode, setAutoMode] = useState(false);
  const [backlogDeath, setBacklogDeath] = useState(0);
  const [death, setDeath] = useState(0);
  const [devPowerFix, setDevPowerFix] = useState(1);
  const [devUnits, setDevUnits] = useState(1);
  const [drag, setDrag] = useState(1);
  const [dragPoint, setDragPoint] = useState(1);
  const [easyStorage, setEasyStorage] = useState(false);
  const [expdtDvUnitsFactor, setExpdtDvUnitsFactor] = useState(1);
  const [expdtQueueLength, setExpdtQueueLength] = useState(0);
  const [flwItmSizeLimit, setFlwItmSizeFactor] = useState(1);
  const [flwTimeMax, setFlwTimeMax] = useState(1);
  const [flwTimeMin, setFlwTimeMin] = useState(1);
  const [fps, setFps] = useState(1);
  const [numberOfSteps, setNumberOfSteps] = useState(4);
  const [paramsMaxWip, setParamsMaxWip] = useState(1);
  const [paretoPoint, setParetoPoint] = useState(0);
  const [rangeIncreaseRate, setRangeIncreaseRate] = useState(1);
  const [rangeMax, setRangeMax] = useState(1);
  const [rangeMidpoint, setRangeMidpoint] = useState(1);
  const [scaleCm, setScaleCm] = useState(10);
  const [sid, setSid] = useState(gSttngs().sid);
  const [specialisation, setSpecialisation] = useState(0);
  const [teamInstability, setTeamInstability] = useState(0);
  const [timeBox, setTimeBox] = useState(10);
  // Populate the lState object so we can access the variables by name
  lState["arrivalRate"] = arrivalRate;
  lState["autoMode"] = autoMode;
  lState["backlogDeath"] = backlogDeath;
  lState["death"] = death;
  lState["devPowerFix"] = devPowerFix;
  lState["devUnits"] = devUnits;
  lState["drag"] = drag;
  lState["dragPoint"] = dragPoint;
  lState["easyStorage"] = easyStorage;
  lState["expdtDvUnitsFactor"] = expdtDvUnitsFactor;
  lState["expdtQueueLength"] = expdtQueueLength;
  lState["flwItmSizeLimit"] = flwItmSizeLimit;
  lState["flwTimeMax"] = flwTimeMax;
  lState["flwTimeMin"] = flwTimeMin;
  lState["fps"] = fps;
  lState["numberOfSteps"] = numberOfSteps;
  lState["paramsMaxWip"] = paramsMaxWip;
  lState["paretoPoint"] = paretoPoint;
  lState["rangeIncreaseRate"] = rangeIncreaseRate;
  lState["rangeMax"] = rangeMax;
  lState["rangeMidpoint"] = rangeMidpoint;
  lState["scaleCm"] = scaleCm;
  lState["sid"] = sid;
  lState["specialisation"] = specialisation;
  lState["teamInstability"] = teamInstability;
  lState["timeBox"] = timeBox;
  // Populate the setStateFunctions object so we can access the set functions by name
  setStateFunctions["arrivalRate"] = setArrivalRate;
  setStateFunctions["autoMode"] = setAutoMode;
  setStateFunctions["backlogDeath"] = setBacklogDeath;
  setStateFunctions["death"] = setDeath;
  setStateFunctions["devPowerFix"] = setDevPowerFix;
  setStateFunctions["devUnits"] = setDevUnits;
  setStateFunctions["drag"] = setDrag;
  setStateFunctions["dragPoint"] = setDragPoint;
  setStateFunctions["easyStorage"] = setEasyStorage;
  setStateFunctions["expdtDvUnitsFactor"] = setExpdtDvUnitsFactor;
  setStateFunctions["expdtQueueLength"] = setExpdtQueueLength;
  setStateFunctions["flwItmSizeLimit"] = setFlwItmSizeFactor;
  setStateFunctions["flwTimeMax"] = setFlwTimeMax;
  setStateFunctions["flwTimeMin"] = setFlwTimeMin;
  setStateFunctions["fps"] = setFps;
  setStateFunctions["numberOfSteps"] = setNumberOfSteps;
  setStateFunctions["paramsMaxWip"] = setParamsMaxWip;
  setStateFunctions["paretoPoint"] = setParetoPoint;
  setStateFunctions["rangeIncreaseRate"] = setRangeIncreaseRate;
  setStateFunctions["rangeMax"] = setRangeMax;
  setStateFunctions["rangeMidpoint"] = setRangeMidpoint;
  setStateFunctions["scaleCm"] = setScaleCm;
  setStateFunctions["sid"] = setSid;
  setStateFunctions["specialisation"] = setSpecialisation;
  setStateFunctions["teamInstability"] = setTeamInstability;
  setStateFunctions["timeBox"] = setTimeBox;
  return [lState, setStateFunctions];
};
export default setStateFunctionsStore;
