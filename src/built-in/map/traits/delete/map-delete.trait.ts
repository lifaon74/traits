import { IMapDeleteFunction } from './map-delete.function-definition';

export interface IMapDeleteTrait<GKey> {
  delete: IMapDeleteFunction<GKey>;
}

