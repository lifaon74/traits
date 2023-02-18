import { IMapSetFunction } from './map-set.function-definition';

export interface IMapSetTrait<GKey, GValue> {
  set: IMapSetFunction<GKey, GValue>;
}

