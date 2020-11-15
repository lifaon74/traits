import { Trait } from '../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitDivide<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract divide(this: GSelf, value: GValue): GReturn;
}

export type TInferTraitDivideGValue<GTrait extends TraitDivide<any, any, any>> =
  GTrait extends TraitDivide<any, infer GValue, any>
    ? GValue
    : never;

export type TInferTraitDivideGReturn<GTrait extends TraitDivide<any, any, any>> =
  GTrait extends TraitDivide<any, any, infer GReturn>
    ? GReturn
    : never;
