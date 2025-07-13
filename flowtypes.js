//-----------------------
// Three.js Camera
//-----------------------
type ThrCamera = {
  aspect: number,
  updateProjectionMatrix: () => void,
  // Add more properties/methods as needed
};

//-----------------------
// Three.js LabelRenderer
//-----------------------
type ThrLabelRenderer = {
  setSize: (width: number, height: number) => void,
  // Add more properties/methods as needed
};

//-----------------------
// Window
//-----------------------
type DomWindow = {
  innerWidth: number,
  innerHeight: number,
  // Add more properties/methods as needed
};
//-----------------------
// Three.js Renderer
//-----------------------
type ThrRenderer = {
  domElement: Object,
  setClearColor: (color: number | string, alpha?: number) => void,
  setSize: (width: number, height: number, updateStyle?: boolean) => void,
  render: (scene: Object, camera: Object) => void,
  setAnimationLoop: (callback: Function) => void,
  xr: Object,
  // Add more methods/properties as needed for your usage
};
// @flow
type GlobalModel = {
  sid: string,
  set: (key: string, value: any) => Object,
  clear: () => Object,
  setSid: (sid: string) => Object,
  setSidIfNotInLocalStore: (sid: string) => Object,
  getSid: () => string,
  setIfNotCached: (key: string, value: any) => Object,
  setSidButNotInLocalStore: (key: string, value: any) => Object,
  setNoCacheIfNotInLocalStorageAddToLocalStorage: (
    key: string,
    value: any,
  ) => Object,
  setNoCache: (key: string, value: any) => Object,
  get: (key: string) => any,
  keyValuePairs: { [string]: any },
};
//------------------------------------------------------------------
// gSttngs
//------------------------------------------------------------------
type GlobalSettings = {
  sid: string,
  set: (key: string, value: any) => void,
  get: (key: string) => any,
  setSid: (sid: string) => Object,
  getSid: () => string,
  keyValuePairs: {
    arrivalRate: number,
    autoMode: boolean,
    backlogDeath: number,
    colorGold: string,
    colorGreen: string,
    colorGrey: string,
    death: number,
    devPowerFix: number,
    targetFlowTime: number,
    devUnits: number,
    dfntnOfReady: number,
    dragMidpoint: number,
    easyStorage: boolean,
    expdtDvUnitsFactor: number,
    expdtQueueLength: number,
    flwItmSizeLimit: 1,
    flwTimeMax: number,
    flwTimeMin: number,
    fps: number,
    numberOfSteps: number,
    paramsMaxWip: number,
    rangeIncreaseRate: number,
    rangeMax: number,
    rangeMidpoint: number,
    scale: number,
    scaleCm: number,
    showMetrics: boolean,
    step: number,
    steps: Array<FlwStep>,
    teamInstability: number,
    timeBox: number,
    touchSteps: number,
    touchSteps: number,
    x: number,
    y: number,
    yOffset: number,
    z: number,
  },
};

type FlwStep = {
  name: string,
  status: "backlog" | "wait" | "touch" | "external" | "done",
  limit: number,
  movingLimit: number,
  devUnits: number,
  movingDevUnits: number,
  flwTimeAtStart: number,
  actualFlwTime: number,
  avAge: number,
};

//-----------------------
// FlwTms
//-----------------------
type FlwTms = Array<number>;

//------------------------------------------------------------------
// gState
//------------------------------------------------------------------
type GlobalState = {
  sid: string,
  set: (key: string, value: any) => void,
  get: (key: string) => any,
  setSid: (sid: string) => Object,
  getSid: () => string,
  keyValuePairs: {
    // -----------------------
    // Checks:
    // -----------------------
    isUpdtngCnfg: boolean,
    started: boolean,
    // -----------------------
    // Data:
    // -----------------------
    arrivalNumber: number,
    clckCbGroup: ClickCubeGroup,
    clicks: number,
    endPosition: ThrMeshPosition,
    expdtCount: number,
    flwItems: FlwItem[],
    flwItmsPulledCount: number,
    flwItmTracker: FlwItmTracker,
    flwMap: FlwMap,
    flwItmsToMove: FlwItmsToMove,
    scnData: SceneData,
    strtPosition: ThrMeshPosition,
    vSphere: VSphere,
    // -----------------------
    // Metrics:
    // -----------------------
    flwTmExpQueue: FlwTmQueue,
    flwTmQueue: FlwTmQueue,
    thrPtExpQueue: ThrPtQueue,
    thrPtQueue: ThrPtQueue,
    vQueue: VQueue,
    wipExpQueue: WipQueue,
    wipQueue: WipQueue,
  },
};

type FlwItmsToMove = { [string]: FlwItem };
type StpLabel = {
  // -----------------------
  // Data:
  // -----------------------
  dPosition: ThrMeshPosition,
  // -----------------------
  // Three.js:
  // -----------------------
  name: string,
  position: ThrMeshPosition,
  uuid: string,
  rotation: ThrMeshRotation,
  lookAt: function,
  rotateY: function,
};
type FlwItem = {
  // -----------------------
  // Data:
  // -----------------------
  dAge: number,
  dColor: string,
  dDysEachTouchStep: number,
  dDysRmnngInTotal: number,
  dDysRmnngThisStep: number,
  dDysTotal: number,
  dExpedite: boolean,
  dMoving: boolean,
  dPosition: ThrMeshPosition,
  dScale: number,
  dSkipForWip: boolean,
  dStepsAges: { [string]: number },
  dStpIndex: number,
  dTmNumber: number,
  dValue: number,
  dVolume: number,
  // -----------------------
  // Three.js:
  // -----------------------
  geometry: {
    scale: (x: number, y: number, z: number) => void,
    dispose: () => void,
  },
  material: {
    color: ThrMtrlColor,
    opacity: number,
    needsUpdate: boolean,
    dispose: () => void,
  },
  name: string,
  position: ThrMeshPosition,
  removeFromParent: () => void,
  rotateY: (radians: number) => void,
  rotation: ThrMeshRotation,
  scale: ThrMeshScale,
  uuid: string,
  visible: boolean,
};

type FlwItmTracker = Object;

type SpareDevDays = {
  // -----------------------
  // Data:
  // -----------------------
  [string]: number,
};
type FlwMap = {
  // -----------------------
  // Data:
  // -----------------------
  [string]: FlwMpItems,
};

type FlwMpItems = Array<FlwItem>;

type ClickCubeGroup = {
  // -----------------------
  // Data:
  // -----------------------
  clckCube: ClickCube,
  // -----------------------
  // Three.js:
  // -----------------------
  add: (VSphere | FlwItem) => void,
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: ThrMeshPosition,
  scale: ThrMeshScale,
  material: { color: ThrMtrlColor },
  rotateY: (radians: number) => void,
  rotation: ThrMeshRotation,
};

type ClickCube = {
  // -----------------------
  // Three.js:
  // -----------------------
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: ThrMeshPosition,
  scale: ThrMeshScale,
  material: { color: ThrMtrlColor },
  rotateY: (radians: number) => void,
  rotation: ThrMeshRotation,
};

type VSphere = {
  // -----------------------
  // Data:
  // -----------------------
  dVolume: number,
  dRadius: number,
  dMoving: boolean,
  dRllngTtlVolume: number,
  dPosition: ThrMeshPosition,
  // -----------------------
  // Three.js:
  // -----------------------
  geometry: {
    scale: (x: number, y: number, z: number) => void,
    dispose: () => void,
  },
  visible: boolean,
  position: ThrMeshPosition,
  scale: ThrMeshScale,
  rotateY: (radians: number) => void,
  rotation: ThrMeshRotation,
};

type SimplePosition = {
  // -----------------------
  // Three.js:
  // -----------------------
  x: number,
  y: number,
  z: number,
};

type ThrMeshScale = {
  // -----------------------
  // Three.js:
  // -----------------------
  x: number,
  y: number,
  z: number,
  set: (number, number, number) => void,
};

type ThrMeshPosition = {
  // -----------------------
  // Three.js:
  // -----------------------
  setFromMatrixPosition: (matrix: Object) => void,
  clone: () => ThrMeshPosition,
  x: number,
  y: number,
  z: number,
};

type ThrMtrlColor = {
  // -----------------------
  // Three.js:
  // -----------------------
  copy: (color: ThrMtrlColor) => void,
  r: number,
  g: number,
  b: number,
};

type ThrMeshRotation = {
  // -----------------------
  // Three.js:
  // -----------------------
  x: number,
  y: number,
  z: number,
  set: (number, number, number) => void,
};

type ReticleStuff = {
  // -----------------------
  // Three.js:
  // -----------------------
  reticle: Object,
  hitTestSource?: Object,
  localSpace?: Object,
  viewerSpace?: Object,
  hitTestSourceInitialized?: Object,
  active?: boolean,
};

type SceneData = {
  // -----------------------
  // Three.js:
  // -----------------------
  stats: Object | typeof undefined,
  scene: Object,
  camera: Object,
  renderer: Object,
  stepLabels: Array<Object>,
  stpMetrics: Array<StpMetrics>,
  reticleStuff: ReticleStuff,
  controller: Object,
};

type StpMetrics = {
  // -----------------------
  // Data:
  // -----------------------
  dStpIndex: number,
  dPosition: ThrMeshPosition,
  // -----------------------
  // Metrics:
  // -----------------------
  Limit: number,
  AvAg: number,
  DvUnts: number,
  // -----------------------
  // Three.js:
  // -----------------------
  geometry: {
    scale: (x: number, y: number, z: number) => void,
    dispose: () => void,
  },
  material: {
    color: ThrMtrlColor,
    opacity: number,
    needsUpdate: boolean,
    map: {
      dispose: () => void,
    },
    dispose: () => void,
  },
  name: string,
  position: ThrMeshPosition,
  uuid: string,
  rotation: ThrMeshRotation,
  lookAt: function,
  rotateY: function,
};

type ThrPtQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => Array<number>,
  total: () => number,
  length: () => number,
  dailyMean: () => number,
  mean: () => number,
};

type FlwTmQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => void,
  total: () => number,
  length: () => number,
  dailyMean: () => number,
  mean: () => number,
};

type WipQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => void,
  total: () => number,
  length: () => number,
  dailyMean: () => number,
  mean: () => number,
};

type ThrPtExpQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => Array<number>,
  total: () => number,
  length: () => number,
  dailyMean: () => number,
  mean: () => number,
};

type FlwTmExpQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => void,
  total: () => number,
  length: () => number,
  dailyMean: () => number,
  mean: () => number,
};

type WipExpQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => void,
  total: () => number,
  length: () => number,
  dailyMean: () => number,
  mean: () => number,
};

type VQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => void,
  total: () => number,
  length: () => number,
  dailyMean: () => number,
  mean: () => number,
};
