import { IIterableTrait } from '../iterable/iterable.trait';
import { IArrayAtTrait } from './traits/at/array-at.trait';
import { IArrayGetLengthTrait } from './traits/get-length/array-get-length.trait';
import { IArrayNewTrait } from './traits/new/array-new.trait';
import { IArrayReduceTrait } from './traits/reduce/array-reduce.trait';

export interface IReadonlyArrayTraitCollection<GValue> extends // traits
  IArrayNewTrait,
  IArrayGetLengthTrait,
  IArrayAtTrait<GValue>,
  IIterableTrait<void, GValue, void>,
  IArrayReduceTrait<GValue>
//
{
}
