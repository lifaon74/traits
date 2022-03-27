import { IValueOfFunction } from './value-of.function-definition';

export interface IValueOfTrait<GValue> {
  valueOf: IValueOfFunction<GValue>;
}

