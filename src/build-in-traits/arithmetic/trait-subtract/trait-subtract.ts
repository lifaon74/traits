import { Trait } from '../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitSubtract<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract subtract(this: GSelf, value: GValue): GReturn;
}

export type TInferTraitSubtractGValue<GTrait extends TraitSubtract<any, any, any>> =
  GTrait extends TraitSubtract<any, infer GValue, any>
    ? GValue
    : never;

export type TInferTraitSubtractGReturn<GTrait extends TraitSubtract<any, any, any>> =
  GTrait extends TraitSubtract<any, any, infer GReturn>
    ? GReturn
    : never;
