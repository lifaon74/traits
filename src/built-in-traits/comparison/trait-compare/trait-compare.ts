import { Trait } from '../../../core/traits/trait-decorator';
import { Ordering } from './ordering-enum';

@Trait()
export abstract class TraitCompare<GSelf, GValue = GSelf> {
  abstract compare(this: GSelf, value: GValue): Ordering;
}

export type TInferTraitCompareGValue<GTrait extends TraitCompare<any, any>> =
  GTrait extends TraitCompare<any, infer GValue>
    ? GValue
    : never;

