import { Trait } from '../../../core/traits/trait-decorator';
import { TraitToggle } from './trait-toggle';
import { TInferTraitActivateGReturn, TraitActivate } from '../trait-activate/trait-activate';
import { TInferTraitDeactivateGReturn, TraitDeactivate } from '../trait-deactivate/trait-deactivate';
import { TraitIsActivated } from '../trait-is-activated/trait-is-activated';

export interface TTraitToggleUsingActivateAndDeactivateGSelfConstraint<GSelf> extends TraitActivate<GSelf, any>, TraitDeactivate<GSelf, any>, TraitIsActivated<GSelf> {
}

export type TTraitToggleUsingActivateAndDeactivateReturn<GSelf extends TTraitToggleUsingActivateAndDeactivateGSelfConstraint<GSelf>> =
  TInferTraitActivateGReturn<GSelf>
  | TInferTraitDeactivateGReturn<GSelf>;

@Trait()
export abstract class TraitToggleUsingActivateAndDeactivate<GSelf extends TTraitToggleUsingActivateAndDeactivateGSelfConstraint<GSelf>> extends TraitToggle<GSelf, TTraitToggleUsingActivateAndDeactivateReturn<GSelf>> {
  toggle(this: GSelf, activate: boolean = !this.isActivated()): TTraitToggleUsingActivateAndDeactivateReturn<GSelf> {
    if (activate) {
      return this.activate();
    } else {
      return this.deactivate();
    }
  }
}



