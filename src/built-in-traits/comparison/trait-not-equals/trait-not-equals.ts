import { Trait } from '../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitNotEquals<GSelf, GValue = GSelf> {
  abstract notEquals(this: GSelf, value: GValue): boolean;
}

export type TInferTraitNotEqualsGValue<GTrait extends TraitNotEquals<any, any>> =
  GTrait extends TraitNotEquals<any, infer GValue>
    ? GValue
    : never;

