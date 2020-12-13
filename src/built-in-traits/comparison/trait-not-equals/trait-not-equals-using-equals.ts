import { Trait } from '../../../core/traits/trait-decorator';
import { TraitEquals } from '../trait-equals/trait-equals';
import { TraitNotEquals } from './trait-not-equals';

export interface ITraitNotEqualsUsingEqualsGSelfConstraint<GValue> extends
  // traits
  TraitEquals<any, GValue>
  //
{
}

@Trait()
export abstract class TraitNotEqualsUsingEquals<GSelf extends ITraitNotEqualsUsingEqualsGSelfConstraint<GValue>, GValue> extends TraitNotEquals<GSelf, GValue> {
  notEquals(this: GSelf, value: GValue): boolean {
    return !this.equals(value);
  }
}
