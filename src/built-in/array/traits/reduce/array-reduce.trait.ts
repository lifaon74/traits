import { IArrayReduceFunction } from './array-reduce.function-definition';

export interface IArrayReduceTrait<GValue> {
  reduce: IArrayReduceFunction<GValue>;
}

