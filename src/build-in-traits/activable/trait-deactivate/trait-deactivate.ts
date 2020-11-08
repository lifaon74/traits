import { Trait } from '../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitDeactivate<GSelf, GReturn> {
  abstract deactivate(this: GSelf): GReturn;
}

export type TInferTraitDeactivateGReturn<GTrait extends TraitDeactivate<any, any>> =
  GTrait extends TraitDeactivate<any, infer GReturn>
    ? GReturn
    : never;
