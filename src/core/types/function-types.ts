
export type TGenericFunction = (...args: any[]) => any;

export type TInferFunctionThis<GFunction extends TGenericFunction> =
  GFunction extends (this: infer GThis, ...args: any[]) => any
    ? GThis
    : never;
