import { IEqualsFunction } from './equals.function-definition';

export interface IEqualsTrait<GValue> {
  equals: IEqualsFunction<GValue>;
}

