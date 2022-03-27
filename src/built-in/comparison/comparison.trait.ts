import { IEqualsTrait } from './equals/equals.trait';
import { INotEqualsTrait } from './not-equals/not-equals.trait';

export interface IComparisonTrait<GValue> extends // traits
  IEqualsTrait<GValue>,
  INotEqualsTrait<GValue>
//
{
}


