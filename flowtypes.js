// --------------------------------------------------
// gSttngs
// --------------------------------------------------
type GlobalSettings = {
  speed: number,
  death: number,
  x: number,
  y: number,
  z: number,
  xCm: number,
  yCm: number,
  zCm: number,
  scale: number,
  scaleCm: number,
  step: number,
  teamsNumber: number,
  teamSize: number,
  wrkflwSteps: Array<WrkflwStep>,
  wrkflwItem: WrkflwItemSettings,
  valueUpdateInterval: number,
};

type WrkflwItemSettings = {
  effort: {
    min: number,
    max: number,
  },
};

type WrkflwStep = {
  name: string,
  status: "open" | "wait" | "touch" | "external" | "done",
};

// --------------------------------------------------
// gState
// --------------------------------------------------
type GlobalState = {
  clicks: number,
  sceneData: SceneData,
  objects: Objects,
  valueQueue: ValueQueue,
};

type Objects = {
  startPosition: CubePosition,
  endPosition: CubePosition,
  wrkflwItems: Array<WrkflwItem>,
  wrkflwStepTotals: {
    [string]: number,
    touchTotal: number,
    doneTotal: number,
  },
  clickCubeGroup: SimpleCubeGroup,
  vSphere: VSphere,
};

type SimpleCubeGroup = {
  add: (VSphere | WrkflwItem) => void,
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  material: { color: CubeColor },
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
  clickCube: SimpleCube,
};

type SimpleCube = {
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  material: { color: CubeColor },
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
};

type VSphere = {
  geometry: {
    scale: (x: number, y: number, z: number) => void,
    dispose: () => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  volume: number,
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
  rollingTotal: number,
};

type WrkflwItem = {
  // Display properties
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  volume: number,
  material: { color: CubeColor, opacity: number, needsUpdate: boolean },
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
  bubble_value: number,
  // Wrkflw properties
  name: string,
  age: number,
  effortTotal: number,
  effortRemaining: number,
  wrkflwStepsIndex: number,
};

type SimplePosition = {
  x: number,
  y: number,
  z: number,
};

type SimpleScale = {
  x: number,
  y: number,
  z: number,
  set: (number, number, number) => void,
};

type CubePosition = {
  setFromMatrixPosition: (matrix: Object) => void,
  clone: () => CubePosition,
  x: number,
  y: number,
  z: number,
};

type CubeColor = {
  r: number,
  g: number,
  b: number,
};

type CubeRotation = {
  x: number,
  y: number,
  z: number,
};

type ReticleStuff = {
  reticle: Object,
  hitTestSource?: Object,
  localSpace?: Object,
  viewerSpace?: Object,
  hitTestSourceInitialized?: Object,
  active: boolean,
};

type SceneData = {
  stats: Object,
  scene: Object,
  camera: Object,
  renderer: Object,
  reticleStuff: ReticleStuff,
};

type ValueQueue = {
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
