import { Trait } from '../../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitSqrt<GSelf, GReturn = GSelf> {
  abstract sqrt(this: GSelf): GReturn;
}

export type TInferTraitSqrtGReturn<GTrait extends TraitSqrt<any, any>> =
  GTrait extends TraitSqrt<any, infer GReturn>
    ? GReturn
    : never;
