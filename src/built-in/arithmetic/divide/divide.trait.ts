import { IDivideFunction } from './divide.function-definition';

export interface IDivideTrait<GValue, GReturn> {
  divide: IDivideFunction<GValue, GReturn>;
}

