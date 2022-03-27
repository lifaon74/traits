import { INegateFunction } from './negate.function-definition';

export interface INegateTrait<GReturn> {
  negate: INegateFunction<GReturn>;
}

