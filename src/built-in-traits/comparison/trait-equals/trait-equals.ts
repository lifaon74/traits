import { Trait } from '../../../core/traits/trait-decorator';

@Trait()
export abstract class TraitEquals<GSelf, GValue = GSelf> {
  abstract equals(this: GSelf, value: GValue): boolean;
}

export type TInferTraitEqualsGValue<GTrait extends TraitEquals<any, any>> =
  GTrait extends TraitEquals<any, infer GValue>
    ? GValue
    : never;

