export type IInferFunctionThis<GFunction> =
  GFunction extends (this: infer GThis, ...args: any[]) => any
    ? GThis
    : never;
