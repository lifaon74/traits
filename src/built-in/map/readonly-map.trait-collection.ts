import { IIterableTrait } from '../iterable/iterable.trait';
import { IMapGetSizeTrait } from './traits/get-size/map-get-size.trait';
import { IMapGetTrait } from './traits/get/map-get.trait';
import { IMapHasTrait } from './traits/has/map-has.trait';

export interface IReadonlyMapTraitCollection<GKey, GValue> extends // traits
  IIterableTrait<void, [GKey, GValue], void>,
  IMapGetSizeTrait,
  IMapGetTrait<GKey, GValue>,
  IMapHasTrait<GKey>
//
{
}
