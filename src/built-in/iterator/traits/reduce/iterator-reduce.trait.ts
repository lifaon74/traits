import { IIteratorReduceFunction } from './iterator-reduce.function-definition';

export interface IIteratorReduceTrait<GIn, GOut, GReturn> {
  reduce: IIteratorReduceFunction<GIn, GOut, GReturn>;
}

