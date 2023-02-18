import { IIterableFunction } from './iterable.function-definition';

export interface IIterableTrait<GIn, GOut, GReturn> {
  [Symbol.iterator]: IIterableFunction<GIn, GOut, GReturn>;
}

