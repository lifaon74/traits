import { INotEqualsFunction } from './not-equals.function-definition';

export interface INotEqualsTrait<GValue> {
  notEquals: INotEqualsFunction<GValue>;
}

