import { AddTrait } from './add.trait';

export type TInferAddTraitGValue<GTrait extends AddTrait<any, any, any>> =
  GTrait extends AddTrait<any, infer GValue, any>
    ? GValue
    : never;

export type TInferAddTraitGReturn<GTrait extends AddTrait<any, any, any>> =
  GTrait extends AddTrait<any, any, infer GReturn>
    ? GReturn
    : never;
