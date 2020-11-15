import { TInferTraitAddGReturn, TInferTraitAddGValue, TraitAdd } from '../trait-add/trait-add';
import { TraitNegate } from '../trait-negate/trait-negate';
import { TraitSubtract } from './trait-subtract';
import { Trait } from '../../../core/traits/trait-decorator';

// export type TraitSubtractUsingAddAndNegateGSelfConstraint<GSelf, GValue extends TraitNegate<any, any>> = TraitAdd<GSelf, TInferTraitNegateGReturn<GValue>, any>;
// export abstract class TraitSubtractUsingAddAndNegate<GSelf extends TraitAdd<GSelf, TInferTraitNegateGReturn<GValue>, any>, GValue extends TraitNegate<GValue, any>> extends TraitSubtract<GSelf, GValue, TInferTraitAddGReturn<GSelf>> {

@Trait()
export abstract class TraitSubtractUsingAddAndNegate<GSelf extends TraitAdd<GSelf, any, any>, GValue extends TraitNegate<GValue, TInferTraitAddGValue<GSelf>>> extends TraitSubtract<GSelf, GValue, TInferTraitAddGReturn<GSelf>> {
  subtract(this: GSelf, value: GValue): TInferTraitAddGReturn<GSelf> {
    return this.add(value.negate());
  }
}

