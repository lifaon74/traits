import { IIteratorMapFunction } from './iterator-map.function-definition';

export interface IIteratorMapTrait<GIn, GOut, GReturn> {
  map: IIteratorMapFunction<GIn, GOut, GReturn>;
}

