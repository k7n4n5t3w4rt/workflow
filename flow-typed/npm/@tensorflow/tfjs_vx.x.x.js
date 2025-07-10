// @flow
declare module '@tensorflow/tfjs' {
  declare export class Sequential {
    add(layer: any): void;
    compile(config: { optimizer: string, loss: string }): void;
    fit(xs: any, ys: any, options?: any): Promise<any>;
    predict(x: any): any;
  }

  declare export function sequential(): Sequential;

  declare export var layers: {
    dense(config: { units: number, inputShape: [number] }): any,
  };

  declare export var train: {
    sgd(learningRate: number): any,
  };

  declare export function tensor2d(data: any, shape?: [number, number]): any;
}