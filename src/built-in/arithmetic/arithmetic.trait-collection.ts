import { IAddTrait } from './add/add.trait';
import { IDivideTrait } from './divide/divide.trait';
import { IMultiplyTrait } from './multiply/multiply.trait';
import { INegateTrait } from './negate/negate.trait';
import { ISubtractTrait } from './subtract/subtract.trait';

export interface IArithmeticTraitCollection<GValue, GReturn> extends // traits
  INegateTrait<GReturn>,
  IAddTrait<GValue, GReturn>,
  ISubtractTrait<GValue, GReturn>,
  IMultiplyTrait<GValue, GReturn>,
  IDivideTrait<GValue, GReturn>
//
{
}


