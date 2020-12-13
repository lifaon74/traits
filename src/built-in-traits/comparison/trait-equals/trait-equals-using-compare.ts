import { Trait } from '../../../core/traits/trait-decorator';
import { TraitCompare } from '../trait-compare/trait-compare';
import { TraitEquals } from '../trait-equals/trait-equals';
import { Ordering } from '../trait-compare/ordering-enum';

export interface ITraitEqualsUsingCompareGSelfConstraint<GValue> extends
  // traits
  TraitCompare<any, GValue>
  //
{
}

@Trait()
export abstract class TraitEqualsUsingCompare<GSelf extends ITraitEqualsUsingCompareGSelfConstraint<GValue>, GValue> extends TraitEquals<GSelf, GValue> {
  compare(this: GSelf, value: GValue): boolean {
    return this.compare(value) === Ordering.Equal;
  }
}
