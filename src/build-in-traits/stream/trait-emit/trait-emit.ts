import { Trait } from '../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitEmit<GSelf, GValue, GReturn> {
  abstract emit(this: GSelf, value: GValue): GReturn;
}

export type TInferTraitEmitGValue<GTrait extends TraitEmit<any, any, any>> =
  GTrait extends TraitEmit<any, infer GValue, any>
    ? GValue
    : never;

export type TInferTraitEmitGReturn<GTrait extends TraitEmit<any, any, any>> =
  GTrait extends TraitEmit<any, any, infer GReturn>
    ? GReturn
    : never;
