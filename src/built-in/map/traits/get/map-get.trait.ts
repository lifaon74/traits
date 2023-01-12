import { IMapGetFunction } from './map-get.function-definition';

export interface IMapGetTrait<GKey, GValue> {
  get: IMapGetFunction<GKey, GValue>;
}

