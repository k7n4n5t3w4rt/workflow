// @flow
//------------------------------------------------------------------
// gSttngs
//------------------------------------------------------------------
type GlobalSettings = {
  arrivalRate: number,
  arrivalFrequency: { min: number, max: number },
  arrivalVolume: { min: number, max: number },
  autoMode: boolean,
  backlogDeath: number,
  backlogMax: number,
  colorGrey: string,
  colorGold: string,
  colorGreen: string,
  death: number,
  debug: boolean,
  devPower: number,
  devUnits: number,
  dfntnOfReady: number,
  drag: number,
  expdtLimit: number,
  expdtdDvUnitsFactor: number,
  flwItmSize: { min: number, max: number },
  flwItmSizeFactor: 1,
  steps: Array<FlwStep>,
  fps: number,
  rangeDecreaseRate: number,
  rangeIncreaseRate: number,
  rangeMax: number,
  scale: number,
  scaleCm: number,
  step: number,
  teamInstability: number,
  timeBox: number,
  touchSteps: number,
  x: number,
  y: number,
  yOffset: number,
  z: number,
};

type FlwStep = {
  name: string,
  status: "open" | "wait" | "touch" | "external" | "done",
  limit: number,
  preload: number,
};

//------------------------------------------------------------------
// gState
//------------------------------------------------------------------
type GlobalState = {
  // -----------------------
  // Data:
  // -----------------------
  clicks: number,
  expdtCount: number,
  vSphere: VSphere,
  scnData: SceneData,
  strtPosition: ThrMeshPosition,
  endPosition: ThrMeshPosition,
  flwMap: FlwMap,
  flwItems: FlwItem[],
  flwItmsPulledCount: number,
  clckCbGroup: ClickCubeGroup,
  flwItmTracker: FlwItmTracker,
  // -----------------------
  // Metrics:
  // -----------------------
  vQueue: VQueue,
  thrPtQueue: ThrPtQueue,
  wipQueue: WipQueue,
  flwTmQueue: FlwTmQueue,
};

type FlwItem = {
  // -----------------------
  // Data:
  // -----------------------
  dAge: number,
  dBacklogAge: number,
  dColor: string,
  dDysEachTouchStep: number,
  dDysRmnngInTotal: number,
  dDysRmnngThisStep: number,
  dDysTotal: number,
  dExpedite: boolean,
  dStpIndex: number,
  dMoving: boolean,
  dPosition: ThrMeshPosition,
  dScale: number,
  dSkipForWip: boolean,
  dTmNumber: number,
  dVolume: number,
  // -----------------------
  // Three.js:
  // -----------------------
  name: string,
  uuid: string,
  geometry: {
    scale: (x: number, y: number, z: number) => void,
    dispose: () => void,
  },
  position: ThrMeshPosition,
  visible: boolean,
  scale: ThrMeshScale,
  material: {
    color: ThrMtrlColor,
    opacity: number,
    needsUpdate: boolean,
    dispose: () => void,
  },
  rotateY: (radians: number) => void,
  rotation: ThrMeshRotation,
  removeFromParent: () => void,
};

type FlwItmTracker = Object;

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
  stats: Object,
  scene: Object,
  camera: Object,
  renderer: Object,
  reticleStuff: ReticleStuff,
};

type ThrPtQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => Array<number>,
  total: () => number,
  length: () => number,
  meanForDays: () => number,
  meanForValues: () => number,
};

type FlwTmQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => void,
  total: () => number,
  length: () => number,
  meanForDays: () => number,
  meanForValues: () => number,
};

type WipQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => void,
  total: () => number,
  length: () => number,
  meanForDays: () => number,
  meanForValues: () => number,
};

type VQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => Array<number>,
  enqueue: (item: Array<number>) => void,
  total: () => number,
  length: () => number,
  meanForDays: () => number,
  meanForValues: () => number,
};

//------------------------------------------------------------------
// MODULES
//------------------------------------------------------------------
declare module "finalhandler" {
  declare module.exports: any;
}

declare module "../web_modules/immer.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-render-to-string.js" {
  declare module.exports: any;
}

declare module "serve-static" {
  declare module.exports: any;
}

declare module "glob" {
  declare module.exports: any;
}

declare module "../web_modules/should/as-function.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact/hooks.js" {
  declare module.exports: any;
}

declare module "../../web_modules/preact/hooks.js" {
  declare module.exports: any;
}

declare module "../../web_modules/simplestyle-js.js" {
  declare module.exports: any;
}

declare module "../web_modules/htm/preact.js" {
  declare module.exports: any;
}

declare module "../../web_modules/htm/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-router.js" {
  declare module.exports: any;
}

declare module "../web_modules/history.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three.js" {
  declare module.exports: any;
}

declare module "../../../web_modules/three.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three/examples/jsm/libs/stats.module.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three/examples/jsm/controls/OrbitControls.js" {
  declare module.exports: any;
}

declare module "../../../web_modules/three/examples/jsm/controls/OrbitControls.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three/examples/jsm/loaders/TGALoader.js" {
  declare module.exports: any;
}

declare module "../../../web_modules/animejs.js" {
  declare module.exports: any;
}
