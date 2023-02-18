import { IMapHasFunction } from './map-has.function-definition';

export interface IMapHasTrait<GKey> {
  has: IMapHasFunction<GKey>;
}

