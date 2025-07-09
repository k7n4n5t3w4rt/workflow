// @flow
//------------------------------------------------------------------
// IMPORT: GLOBALS
//------------------------------------------------------------------
import gSttngs from "../actions/gSttngs.js";
import gState from "../actions/gState.js";
//------------------------------------------------------------------
// FUNCTION: setStateParamsFunctionsStore()
//------------------------------------------------------------------
export const setStateParamsFunctionsStore = (
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
  //----------------------------------------
  // Sharing
  //----------------------------------------
  const [sid, setSid] = useState(gSttngs().get("sid"));
  setStateFunctions["sid"] = setSid;
  lState["sid"] = sid;
  //----------------------------------------
  // Display
  //----------------------------------------
  const [fps, setFps] = useState(1);
  setStateFunctions["fps"] = setFps;
  lState["fps"] = fps;
  const [flwItmSizeLimit, setFlwItmSizeLimit] = useState(1);
  setStateFunctions["flwItmSizeLimit"] = setFlwItmSizeLimit;
  lState["flwItmSizeLimit"] = flwItmSizeLimit;
  const [paramsMaxWip, setParamsMaxWip] = useState(1);
  setStateFunctions["paramsMaxWip"] = setParamsMaxWip;
  lState["paramsMaxWip"] = paramsMaxWip;
  // const [scaleCm, setScaleCm] = useState(10);
  // setStateFunctions["scaleCm"] = setScaleCm;
  // lState["scaleCm"] = scaleCm;
  // const [rangeMax, setRangeMax] = useState(1);
  // setStateFunctions["rangeMax"] = setRangeMax;
  // lState["rangeMax"] = rangeMax;
  // const [rangeIncreaseRate, setRangeIncreaseRate] = useState(1);
  // setStateFunctions["rangeIncreaseRate"] = setRangeIncreaseRate;
  // lState["rangeIncreaseRate"] = rangeIncreaseRate;
  // const [rangeMidpoint, setRangeMidpoint] = useState(1);
  // setStateFunctions["rangeMidpoint"] = setRangeMidpoint;
  // lState["rangeMidpoint"] = rangeMidpoint;
  return [lState, setStateFunctions];
};
export default setStateParamsFunctionsStore;
