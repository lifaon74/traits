import { IIteratorNextFunction } from './iterator-next.function-definition';

export interface IIteratorNextTrait<GIn, GOut, GReturn> {
  next: IIteratorNextFunction<GIn, GOut, GReturn>;
}

