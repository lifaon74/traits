import { DivideTrait } from './divide.trait';

export type TInferDivideTraitGValue<GTrait extends DivideTrait<any, any, any>> =
  GTrait extends DivideTrait<any, infer GValue, any>
    ? GValue
    : never;

export type TInferDivideTraitGReturn<GTrait extends DivideTrait<any, any, any>> =
  GTrait extends DivideTrait<any, any, infer GReturn>
    ? GReturn
    : never;
