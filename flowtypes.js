// --------------------------------------------------
// gSettings
// --------------------------------------------------
type GlobalSettings = {
  speed: number,
  xCm: number,
  yCm: number,
  zCm: number,
  stepCm: number,
  teamsNumber: number,
  teamSize: number,
  workflowSteps: Array<WorkflowSteps>,
  workflowItem: WorkflowItemSettings,
  valueUpdateInterval: number,
};

type WorkflowItemSettings = {
  effort: {
    min: number,
    max: number,
  },
};

type WorkflowSteps = {
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
  workflowItems: Array<WorkflowItem>,
  clickCube: SimpleCube,
  valueSphere: ValueSphere,
};

type SimpleCube = {
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
};

type ValueSphere = {
  geometry: {
    scale: (x: number, y: number, z: number) => void,
  },
  position: CubePosition,
  scale: SimpleScale,
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
  rollingTotal: number,
};

type WorkflowItem = {
  // Display properties
  position: CubePosition,
  material: { color: CubeColor },
  rotateY: (radians: number) => void,
  rotation: CubeRotation,
  bubble_value: number,
  // Workflow properties
  name: string,
  effortTotal: number,
  effortRemaining: number,
  workflowStepsIndex: number,
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
