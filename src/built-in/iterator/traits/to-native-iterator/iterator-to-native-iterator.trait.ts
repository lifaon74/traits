import { IIteratorToNativeIteratorFunction } from './iterator-to-native-iterator.function-definition';

export interface IIteratorToNativeIteratorTrait<GIn, GOut, GReturn> {
  toNativeIterator: IIteratorToNativeIteratorFunction<GIn, GOut, GReturn>;
}

