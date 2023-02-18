import { IMapDeleteTrait } from './traits/delete/map-delete.trait';
import { IReadonlyMapTraitCollection } from './readonly-map.trait-collection';
import { IMapSetTrait } from './traits/set/map-set.trait';

export interface IMapTraitCollection<GKey, GValue> extends // traits
  IReadonlyMapTraitCollection<GKey, GValue>,
  IMapSetTrait<GKey, GValue>,
  IMapDeleteTrait<GKey>
//
{
}


