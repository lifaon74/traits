import { NegateTrait } from './negate.trait';

export type TInferNegateTraitGReturn<GTrait extends NegateTrait<any, any>> =
  GTrait extends NegateTrait<any, infer GReturn>
    ? GReturn
    : never;
