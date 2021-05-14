import { SubtractTrait } from './subtract.trait';

export type TInferSubtractTraitGValue<GTrait extends SubtractTrait<any, any, any>> =
  GTrait extends SubtractTrait<any, infer GValue, any>
    ? GValue
    : never;

export type TInferSubtractTraitGReturn<GTrait extends SubtractTrait<any, any, any>> =
  GTrait extends SubtractTrait<any, any, infer GReturn>
    ? GReturn
    : never;
