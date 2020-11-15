import { Trait } from '../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitMultiply<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract multiply(this: GSelf, value: GValue): GReturn;
}

export type TInferTraitMultiplyGValue<GTrait extends TraitMultiply<any, any, any>> =
  GTrait extends TraitMultiply<any, infer GValue, any>
    ? GValue
    : never;

export type TInferTraitMultiplyGReturn<GTrait extends TraitMultiply<any, any, any>> =
  GTrait extends TraitMultiply<any, any, infer GReturn>
    ? GReturn
    : never;
