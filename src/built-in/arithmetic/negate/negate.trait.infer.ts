import { INegateTrait } from './negate.trait';

export type InferNegateTraitGReturn<GFunction extends INegateTrait<any>> =
  GFunction extends INegateTrait<infer GReturn>
    ? GReturn
    : never;
