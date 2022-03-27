import { IAddTrait } from './add/add.trait';
import { ISubtractTrait } from './subtract/subtract.trait';
import { IMultiplyTrait } from './multiply/multiply.trait';
import { IDivideTrait } from './divide/divide.trait';
import { INegateTrait } from './negate/negate.trait';

export interface IArithmeticTrait<GValue, GReturn> extends // traits
  INegateTrait<GReturn>,
  IAddTrait<GValue, GReturn>,
  ISubtractTrait<GValue, GReturn>,
  IMultiplyTrait<GValue, GReturn>,
  IDivideTrait<GValue, GReturn>
//
{
}


