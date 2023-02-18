import { ISubtractFunction } from './subtract.function-definition';

export interface ISubtractTrait<GValue, GReturn> {
  subtract: ISubtractFunction<GValue, GReturn>;
}

