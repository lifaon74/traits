import { IMultiplyFunction } from './multiply.function-definition';

export interface IMultiplyTrait<GValue, GReturn> {
  multiply: IMultiplyFunction<GValue, GReturn>;
}

