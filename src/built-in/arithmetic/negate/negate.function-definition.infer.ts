import { INegateFunction } from './negate.function-definition';

export type InferNegateFunctionGReturn<GFunction extends INegateFunction<any>> =
  GFunction extends INegateFunction<infer GReturn>
    ? GReturn
    : never;
