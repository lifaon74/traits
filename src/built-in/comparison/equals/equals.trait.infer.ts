import { EqualsTrait } from './equals.trait';

export type TInferEqualsTraitGValue<GTrait extends EqualsTrait<any, any>> =
  GTrait extends EqualsTrait<any, infer GValue>
    ? GValue
    : never;
