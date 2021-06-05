import { SubtractTrait } from '../subtract.trait';
import { NegateTrait } from '../../negate';
import { TInferAddTraitGReturn, TInferAddTraitGValue, AddTrait } from '../../add';
import { Trait } from '../../../../core';

// constraints
export type ISubtractUsingAddAndNegateTraitGSelfConstraint = AddTrait<any, any, any>;
export type ISubtractUsingAddAndNegateTraitGValueConstraint<GSelf extends ISubtractUsingAddAndNegateTraitGSelfConstraint> = NegateTrait<any, TInferAddTraitGValue<GSelf>>;

// return
export type ISubtractUsingAddAndNegateTraitGReturn<GSelf extends ISubtractUsingAddAndNegateTraitGSelfConstraint> = TInferAddTraitGReturn<GSelf>;


@Trait()
export abstract class SubtractUsingAddAndNegateTrait< // generics
  GSelf extends ISubtractUsingAddAndNegateTraitGSelfConstraint,
  GValue extends ISubtractUsingAddAndNegateTraitGValueConstraint<GSelf>
  //
  > extends SubtractTrait<GSelf, GValue, ISubtractUsingAddAndNegateTraitGReturn<GSelf>> {
  subtract(this: GSelf, value: GValue): ISubtractUsingAddAndNegateTraitGReturn<GSelf> {
    return this.add(value.negate());
  }
}
