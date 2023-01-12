import { IIteratorResultGetValueFunction } from './iterator-result-get-value.function-definition';

export interface IIteratorResultGetValueTrait<GOut> {
  getValue: IIteratorResultGetValueFunction<GOut>;
}

