import { IEqualsTrait } from './equals/equals.trait';
import { INotEqualsTrait } from './not-equals/not-equals.trait';

export interface IComparisonTraitCollection<GValue> extends // traits
  IEqualsTrait<GValue>,
  INotEqualsTrait<GValue>
//
{
}


