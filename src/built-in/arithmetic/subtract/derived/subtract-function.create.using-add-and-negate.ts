import { IAddTrait } from '../../add/add.trait';
import { INegateTrait } from '../../negate/negate.trait';
import { InferNegateTraitGReturn } from '../../negate/negate.trait.infer';
import { ISubtractFunction } from '../subtract.function-definition';

export type ICreateSubtractFunctionUsing$Add$And$Negate$GValueConstraint = INegateTrait<any>;

export interface ICreateSubtractFunctionUsing$Add$And$Negate$Options< // generics
  GValue extends ICreateSubtractFunctionUsing$Add$And$Negate$GValueConstraint,
  GReturn
  //
  > extends // traits
  IAddTrait<InferNegateTraitGReturn<GValue>, GReturn>
//
{
}

export function createSubtractFunctionUsing$Add$And$Negate$< // generics
  GValue extends ICreateSubtractFunctionUsing$Add$And$Negate$GValueConstraint,
  GReturn
  //
  >(
  {
    add,
  }: ICreateSubtractFunctionUsing$Add$And$Negate$Options<GValue, GReturn>,
): ISubtractFunction<GValue, GReturn> {
  return (value: GValue): GReturn => {
    return add(value.negate());
  };
}
