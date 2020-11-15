import { Trait } from '../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitNegate<GSelf, GReturn = GSelf> {
  abstract negate(this: GSelf): GReturn;
}

export type TInferTraitNegateGReturn<GTrait extends TraitNegate<any, any>> =
  GTrait extends TraitNegate<any, infer GReturn>
    ? GReturn
    : never;
