// --------------------------------------------------
// gSttngs
// --------------------------------------------------
type GlobalSettings = {
  debug: boolean,
  fps: number,
  death: number,
  x: number,
  y: number,
  z: number,
  xCm: number,
  yCm: number,
  zCm: number,
  scale: number,
  yOffset: number,
  scaleCm: number,
  step: number,
  tmsNumber: number,
  tmSize: number,
  flwSteps: Array<FlwStep>,
  flwItem: FlwItemSettings,
  valueUpdateInterval: number,
  rangeMax: number,
  rangeIncreaseRate: number,
  rangeDecreaseRate: number,
};

type FlwItemSettings = {
  effort: {
    min: number,
    max: number,
  },
};

type FlwStep = {
  name: string,
  status: "open" | "wait" | "touch" | "external" | "done",
  limit: number,
};

// --------------------------------------------------
// gState
// --------------------------------------------------
type GlobalState = {
  // -----------------------
  // Data:
  // -----------------------
  clicks: number,
  scnData: SceneData,
  vSphere: VSphere,
  strtPosition: ThrMeshPosition,
  endPosition: ThrMeshPosition,
  flwMap: FlwMap,
  flwItems: FlwItem[],
  clckCbGroup: ClickCubeGroup,
  vQueue: VQueue,
  tchTotal: number,
  doneTotal: number,
  flwItmTracker: FlwItmTracker,
};

type FlwItem = {
  // -----------------------
  // Data:
  // -----------------------
  dAge: number,
  dColor: string,
  dMoving: boolean,
  dEffrtTotal: number,
  dTmNumber: number,
  dEffrtRmnngCurrentStep: number,
  dEffrtRmnngInTotal: number,
  dFlwStpsIndex: number,
  dPosition: ThrMeshPosition,
  dVolume: number,
  // -----------------------
  // Three.js:
  // -----------------------
  name: string,
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
  tchTotal: number,
  doneTotal: number,
};

type FlwMpItems = Array<FlwItem>;

type FlwStepTotals = {
  // -----------------------
  // Data:
  // -----------------------
  [string]: number,
  tchTotal: number,
  doneTotal: number,
};

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
  active: boolean,
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

type VQueue = {
  // -----------------------
  // Data:
  // -----------------------
  dequeue: () => void,
  enqueue: (item: number) => void,
  total: () => number,
  length: () => number,
};

// --------------------------------------------------
// MODULES
// --------------------------------------------------
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
