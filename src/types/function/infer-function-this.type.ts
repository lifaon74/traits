export type TInferFunctionThis<GFunction> =
  GFunction extends (this: infer GThis, ...args: any[]) => any
    ? GThis
    : never;
