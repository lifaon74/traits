import { MultiplyTrait } from './multiply.trait';


export type TInferMultiplyTraitGValue<GTrait extends MultiplyTrait<any, any, any>> =
  GTrait extends MultiplyTrait<any, infer GValue, any>
    ? GValue
    : never;

export type TInferMultiplyTraitGReturn<GTrait extends MultiplyTrait<any, any, any>> =
  GTrait extends MultiplyTrait<any, any, infer GReturn>
    ? GReturn
    : never;
