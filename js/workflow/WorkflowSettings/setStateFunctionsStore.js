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
  const [flwItmSizeMin, setFlwItmSizeMin] = useState(1);
  setStateFunctions["flwItmSizeMin"] = setFlwItmSizeMin;
  lState["flwItmSizeMin"] = flwItmSizeMin;
  const [flwItmSizeMax, setFlwItmSizeMax] = useState(1);
  setStateFunctions["flwItmSizeMax"] = setFlwItmSizeMax;
  lState["flwItmSizeMax"] = flwItmSizeMax;
  const [devUnits, setDevUnits] = useState(1);
  setStateFunctions["devUnits"] = setDevUnits;
  lState["devUnits"] = devUnits;
  const [devCapacityAvailable, setDevCapacityAvailable] = useState(1);
  setStateFunctions["devCapacityAvailable"] = setDevCapacityAvailable;
  lState["devCapacityAvailable"] = devCapacityAvailable;
  const [drag, setDrag] = useState(0);
  setStateFunctions["drag"] = setDrag;
  lState["drag"] = drag;
  const [timeBox, setTimeBox] = useState(10);
  setStateFunctions["timeBox"] = setTimeBox;
  lState["timeBox"] = timeBox;
  const [death, setDeath] = useState(0);
  setStateFunctions["death"] = setDeath;
  lState["death"] = death;
  const [backlogDeath, setBacklogDeath] = useState(0);
  setStateFunctions["backlogDeath"] = setBacklogDeath;
  lState["backlogDeath"] = backlogDeath;
  const [flwItmSizeFactor, setFlwItmSizeFactor] = useState(1);
  setStateFunctions["flwItmSizeFactor"] = setFlwItmSizeFactor;
  lState["flwItmSizeFactor"] = flwItmSizeFactor;
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
  // Not implemented yet
  const [specialisation, setSpecialisation] = useState(0);
  setStateFunctions["specialisation"] = setSpecialisation;
  lState["specialisation"] = specialisation;
  const [teamInstability, setTeamInstability] = useState(0);
  setStateFunctions["teamInstability"] = setTeamInstability;
  lState["teamInstability"] = teamInstability;
  return [lState, setStateFunctions];
};
